import { Component, Output } from '@angular/core';
import { LoginConfig } from '../../windows/auth-window/auth-window.component';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { AuthorizationService } from '../../../core/services/authorization/authorization.service';
import { LogoutUseCase } from '../../../core/usecases/logout.usecase';
import { Store } from '@ngrx/store';
import { UserActions } from '../../../core/actions/user.actions';

@Component({
  selector: 'album-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output()
  loginConfig!: LoginConfig | null;

  constructor(
    private authService: AuthorizationService,
    private logoutUseCase: LogoutUseCase,
    private store: Store,
  ) {}

  onLoginButtonClick(): void {
    this.loginConfig = {
      onWindowClosed: () => {
        this.loginConfig = null;
      },
    };
  }

  onLogoutButtonClick(): void {
    this.logoutUseCase.invoke().subscribe(() => {
      this.store.dispatch(UserActions.logoutUser({ uid: '' }));
      this.loginConfig = null;
    });
  }

  getUserObservable(): Observable<User> {
    return this.authService.user$;
  }
}
