import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Card } from '../../core/models/card.model';
import { filter, map, Observable, Subscription, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CardsSelectors } from '../../core/selectors/cards.selectors';
import { UserSelectors } from '../../core/selectors/user.selectors';
import { CardsActions } from '../../core/actions/cards.actions';
import { GetCardsUseCase } from '../../core/usecases/get-cards.usecase';
import { User } from '../../core/models/user.model';
import { AddNewCardWindowActions } from '../../core/actions/add-new-card-window.actions';
import { AddNewCardWindowSelectors } from '../../core/selectors/add-new-card-window.selectors';

@Component({
  selector: 'album-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
})
export class CardsListComponent implements OnInit, OnDestroy {
  user$!: Observable<User>;
  userSubscription!: Subscription;
  cards$!: Observable<Card[]>;
  cardsSubscription!: Subscription;
  storeCardsSubscription!: Subscription;

  addNewCardWindowShown$!: Observable<boolean>;

  constructor(
    private store: Store,
    private getCardsUseCase: GetCardsUseCase
  ) {
    this.user$ = this.store.select(UserSelectors.selectUserState);
    this.cards$ = this.store.select(CardsSelectors.selectCards).pipe(
      map((cardsState) => cardsState.cards)
    );
    this.addNewCardWindowShown$ = this.store.select(AddNewCardWindowSelectors.selectAddNewCardWindowShown);
  }

  ngOnInit(): void {
    this.userSubscription = this.user$.subscribe((user) => {
      console.log('cards-list', user);
    });
    this.cardsSubscription = this.cards$.subscribe((cards) => {
      console.log('cards-list', cards);
    });
    this.storeCardsSubscription = this.user$.pipe(
      filter((user) => user.uid != ''),
      switchMap((user) => {
        return this.getCardsUseCase.invoke(user.uid)
      })
    ).subscribe((cards) => {
      this.store.dispatch(CardsActions.getCards({cards: cards}));
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.cardsSubscription.unsubscribe();
    this.storeCardsSubscription.unsubscribe();
  }

  onAddNewCardButtonClicked() {
    this.store.dispatch(AddNewCardWindowActions.showWindow());
  }
}
