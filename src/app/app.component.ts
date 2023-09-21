import { Component, OnInit } from '@angular/core';
import { BaseComponent } from './core/base/base-component';
import { AuthorizationService } from './core/services/authorization/authorization.service';
import { distinct, filter, first, Observable, switchMap, tap } from 'rxjs';
import { User } from './core/models/user.model';
import { LoginExistedUserUseCase } from './core/usecases/login-existed-user.usecase';
import { Store } from '@ngrx/store';
import { CardsActions } from './core/actions/cards.actions';
import { StoreService } from './core/services/store/store.service';
import { UserSelectors } from './core/selectors/user.selectors';
import { UserActions } from './core/actions/user.actions';

@Component({
  selector: 'album-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit {

  user$!: Observable<User>
  constructor(
    private loginExistedUserUseCase: LoginExistedUserUseCase,
    private store: Store,
    private storeService: StoreService
  ) {
    super();
    console.log('app component');
    this.user$ = this.store.select(UserSelectors.selectUserState)
      .pipe(
        tap(() => {
          console.log('app component user observable');
        })
      );
    this.user$
      .pipe(
        switchMap((user) => {
          return this.storeService.checkExistedUser(user.uid)
        }),
        filter((isExisted) => !isExisted),
        switchMap(() => {
          return this.store.select(UserSelectors.selectUserState)
            .pipe(filter((user) => user.uid != ''));
        })
      )
      .subscribe((user) => {
      console.log('app component set user')
      this.storeService.setUser(
        user.uid,
        {uid: user.uid, email: user.email},
        () => {}
      );
    });
    this.loginExistedUserUseCase.invoke().subscribe();
  }

  ngOnInit() {
  }
}
