import { Component, HostListener, OnChanges, OnInit } from '@angular/core';
import { BaseComponent } from './core/base/base-component';
import { AuthorizationService } from './core/services/authorization/authorization.service';
import { distinct, filter, first, map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { User } from './core/models/user.model';
import { LoginExistedUserUseCase } from './core/usecases/login-existed-user.usecase';
import { Store } from '@ngrx/store';
import { CardsActions } from './core/actions/cards.actions';
import { StoreService } from './core/services/store/store.service';
import { UserSelectors } from './core/selectors/user.selectors';
import { UserActions } from './core/actions/user.actions';
import { Card } from './core/models/card.model';
import { CardsSelectors } from './core/selectors/cards.selectors';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'album-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit {

  user$!: Observable<User>;
  cards$!: Observable<Card[]>;
  constructor(
    private loginExistedUserUseCase: LoginExistedUserUseCase,
    private store: Store
  ) {
    super();
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
