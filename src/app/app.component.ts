import { Component, OnInit } from '@angular/core';
import { BaseComponent } from './core/base/base-component';
import { map, Observable } from 'rxjs';
import { User } from './core/models/user.model';
import { LoginExistedUserUseCase } from './core/usecases/login-existed-user.usecase';
import { Store } from '@ngrx/store';
import { UserSelectors } from './core/selectors/user.selectors';
import { Card } from './core/models/card.model';
import { CardsSelectors } from './core/selectors/cards.selectors';
import { EditCardWindowSelectors } from './core/selectors/edit-card-window.selectors';

@Component({
  selector: 'album-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit {

  user$!: Observable<User>;
  cards$!: Observable<Card[]>;

  editCardWindowShown$!: Observable<boolean>;
  constructor(
    private loginExistedUserUseCase: LoginExistedUserUseCase,
    private store: Store
  ) {
    super();
    this.editCardWindowShown$ = this.store.select(EditCardWindowSelectors.selectEditCardWindowShown);
    this.user$ = this.store.select(UserSelectors.selectUserState);
    this.loginExistedUserUseCase.invoke().subscribe();
    this.user$.subscribe((user) => {
      console.log('app', user);
    });
    this.cards$ = this.store.select(CardsSelectors.selectCards).pipe(map((cardsState) => cardsState.cards));
    this.cards$.subscribe((cards) => {
      console.log('header', cards);
    });
  }

  ngOnInit() {
  }
}
