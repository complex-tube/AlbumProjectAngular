import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { LoginConfig } from '../../windows/auth-window/auth-window.component';
import { filter, fromEvent, map, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { AuthorizationService } from '../../../core/services/authorization/authorization.service';
import { LogoutUseCase } from '../../../core/usecases/logout.usecase';
import { Store } from '@ngrx/store';
import { UserActions } from '../../../core/actions/user.actions';
import { UserSelectors } from '../../../core/selectors/user.selectors';
import { CardsActions } from '../../../core/actions/cards.actions';

@Component({
  selector: 'album-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output()
  loginConfig!: LoginConfig | null;

  user$!: Observable<User>;

  constructor(
    private authService: AuthorizationService,
    private logoutUseCase: LogoutUseCase,
    private store: Store,
  ) {
    this.user$ = this.store.select(UserSelectors.selectUserState);
    this.user$.subscribe((user) => {
      console.log('header', user);
    });
  }

  onLoginButtonClick(): void {
    this.loginConfig = {
      onWindowClosed: () => {
        this.loginConfig = null;
      },
    };
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
      this.loginConfig = null;
    });
  }
}
