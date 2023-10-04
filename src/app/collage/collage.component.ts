import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Observable, Subscription, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../core/models/user.model';
import { Card } from '../core/models/card.model';
import { GetCardsUseCase } from '../core/usecases/get-cards.usecase';
import { UserSelectors } from '../core/selectors/user.selectors';
import { CardsSelectors } from '../core/selectors/cards.selectors';
import { AddNewCardWindowSelectors } from '../core/selectors/add-new-card-window.selectors';
import { CardsActions } from '../core/actions/cards.actions';
import { AddNewCardWindowActions } from '../core/actions/add-new-card-window.actions';


@Component({
  selector: 'album-collage',
  templateUrl: './collage.component.html',
  styleUrls: ['./collage.component.scss'],
})
export class CollageComponent implements OnInit, OnDestroy {
  user$!: Observable<User>;
  userSub!: Subscription;
  cards$!: Observable<Card[]>;
  cardsSub!: Subscription;
  storeCardsSub!: Subscription;

  addNewCardWindowShown$!: Observable<boolean>;

  constructor(
    private store: Store,
    private getCardsUseCase: GetCardsUseCase,
  ) {
    this.user$ = this.store.select(UserSelectors.selectUserState);
    this.cards$ = this.store
      .select(CardsSelectors.selectCards)
      .pipe(map((cardsState) => cardsState.cards));
    this.addNewCardWindowShown$ = this.store.select(
      AddNewCardWindowSelectors.selectAddNewCardWindowShown,
    );
  }

  ngOnInit(): void {
    this.userSub = this.user$.subscribe((user) => {
      console.log('cards-list', user);
    });
    this.cardsSub = this.cards$.subscribe((cards) => {
      console.log('cards-list', cards);
    });
    this.storeCardsSub = this.user$
      .pipe(
        filter((user) => user.uid != ''),
        switchMap((user) => {
          return this.getCardsUseCase.invoke(user.uid);
        }),
      )
      .subscribe((cards) => {
        this.store.dispatch(CardsActions.getCards({ cards: cards }));
      });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    if (this.cardsSub) {
      this.cardsSub.unsubscribe();
    }
    if (this.storeCardsSub) {
      this.storeCardsSub.unsubscribe();
    }
  }

  onAddNewCardButtonClicked() {
    this.store.dispatch(AddNewCardWindowActions.showWindow());
  }
}
