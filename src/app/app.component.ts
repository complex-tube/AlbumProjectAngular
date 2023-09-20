import { Component, OnInit } from '@angular/core';
import { BaseComponent } from './core/base/base-component';
import { AuthorizationService } from './core/services/authorization/authorization.service';
import { filter, Observable, switchMap } from 'rxjs';
import { User } from './core/models/user.model';
import { LoginExistedUserUseCase } from './core/usecases/login-existed-user.usecase';
import { GetCardsUseCase } from './core/usecases/get-cards.usecase';
import { CardsActions } from './core/actions/cards.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'album-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit {
  constructor(
    private authService: AuthorizationService,
    private loginExistedUserUseCase: LoginExistedUserUseCase,
    private getPicturesUrlsUseCase: GetCardsUseCase,
    private store: Store,
  ) {
    super();
  }

  ngOnInit() {
    this.loginExistedUserUseCase.invoke();
    this.getUserObservable()
      .pipe(
        filter((user) => user.uid != ''),
        switchMap(() => {
          return this.getPicturesUrlsUseCase.invoke();
        }),
      )
      .subscribe((cards) => {
        this.store.dispatch(CardsActions.getCards({ cards: cards }));
      });
  }

  getUserObservable(): Observable<User> {
    return this.authService.user$;
  }
}
