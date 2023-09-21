import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from '../../core/services/storage/storage.service';
import { Card } from '../../core/models/card.model';
import { filter, map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CardsSelectors } from '../../core/selectors/cards.selectors';
import { CardsState } from '../../core/reducers/cards.reducer';
import { StoreService } from '../../core/services/store/store.service';
import { AuthorizationService } from '../../core/services/authorization/authorization.service';
import { UserSelectors } from '../../core/selectors/user.selectors';
import { CardsActions } from '../../core/actions/cards.actions';
import { GetCardsUseCase } from '../../core/usecases/get-cards.usecase';

@Component({
  selector: 'album-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
})
export class CardsListComponent implements OnInit, OnDestroy {
  cards$!: Observable<Card[]>;
  cardsSubscription!: Subscription;
  storeCardsSubscription!: Subscription;

  constructor(
    private store: Store,
    private getCardsUseCase: GetCardsUseCase
  ) {
    this.storeCardsSubscription = this.store.select(UserSelectors.selectUserState)
      .pipe(
        filter((user) => user.uid != '')
      ).subscribe((user) => {
        this.getCardsUseCase.invoke(user.uid).subscribe((cards) => {
          this.store.dispatch(CardsActions.getCards({cards: cards}));
        });
      });
    this.cards$ = this.store
      .select(CardsSelectors.selectCards)
      .pipe(
        map((cardsState) => {
          return cardsState.cards
        })
      );
    this.cardsSubscription = this.cards$.subscribe();
  }

  ngOnInit(): void {
    // this.storeCardsSubscription = this.store.select(UserSelectors.selectUserState)
    //   .pipe(
    //     filter((user) => user.uid != ''),
    //     switchMap((user) => {
    //       return this.getCardsUseCase.invoke(user.uid);
    //     }))
    //   .subscribe((cards) => {
    //       this.store.dispatch(CardsActions.getCards({cards: cards}));
    //   })
  }

  ngOnDestroy() {
    this.cardsSubscription.unsubscribe();
    this.storeCardsSubscription.unsubscribe();
  }
}
