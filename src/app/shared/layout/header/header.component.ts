import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { LogoutUseCase } from '../../../core/usecases/logout.usecase';
import { Store } from '@ngrx/store';
import { UserActions } from '../../../core/actions/user.actions';
import { UserSelectors } from '../../../core/selectors/user.selectors';
import { CardsActions } from '../../../core/actions/cards.actions';
import { AuthWindowActions } from '../../../core/actions/auth-window.actions';
import { AuthWindowSelectors } from '../../../core/selectors/auth-window.selectors';

@Component({
  selector: 'album-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  user$!: Observable<User>;
  isAuthWindowShown$!: Observable<boolean>;

  constructor(
    private logoutUseCase: LogoutUseCase,
    private store: Store,
  ) {
    this.user$ = this.store.select(UserSelectors.selectUserState);
    this.user$.subscribe((user) => {
      console.log('header', user);
    });
    this.isAuthWindowShown$ = this.store.select(AuthWindowSelectors.selectAuthWindowShown);
  }

  onLoginButtonClick(): void {
    this.store.dispatch(AuthWindowActions.showWindow());
  }

  onLogoutButtonClick(): void {
    const logoutUseCase$ = this.logoutUseCase.invoke();
    logoutUseCase$.subscribe(() => {
      this.store.dispatch(UserActions.logoutUser({uid: '', email: ''}));
      console.log('header logout user dispatch');
    });
    logoutUseCase$.subscribe(() => {
      this.store.dispatch(CardsActions.clearCards());
      console.log('header clear cards dispatch');
    });
    logoutUseCase$.subscribe(() => {
      this.store.dispatch(AuthWindowActions.closeWindow());
    });
  }
}
