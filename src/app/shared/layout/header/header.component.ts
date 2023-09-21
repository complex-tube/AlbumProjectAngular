import { Component, Output } from '@angular/core';
import { LoginConfig } from '../../windows/auth-window/auth-window.component';
import { Observable, tap } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { AuthorizationService } from '../../../core/services/authorization/authorization.service';
import { LogoutUseCase } from '../../../core/usecases/logout.usecase';
import { Store } from '@ngrx/store';
import { UserActions } from '../../../core/actions/user.actions';
import { CardsActions } from '../../../core/actions/cards.actions';
import { UserSelectors } from '../../../core/selectors/user.selectors';

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
    private store: Store
  ) {
    this.user$ = this.store.select(UserSelectors.selectUserState);
  }

  onLoginButtonClick(): void {
    this.loginConfig = {
      onWindowClosed: () => {
        this.loginConfig = null;
      },
    };
  }

  onLogoutButtonClick(): void {
    this.logoutUseCase.invoke().pipe(
      tap(() => {
        console.log('header logout user');
        this.store.dispatch(UserActions.logoutUser({uid: '', email: ''}));
      }),
      tap(() => {
        console.log('header clear cards');
        this.store.dispatch(CardsActions.clearCards());
      }),
    ).subscribe(() => {
      this.loginConfig = null;
    });
  }
}
