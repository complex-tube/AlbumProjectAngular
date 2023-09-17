import { Component, Output } from '@angular/core';
import { LoginConfig } from '../../windows/auth-window/auth-window.component';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { AuthorizationService } from '../../../core/services/authorization/authorization.service';

@Component({
  selector: 'album-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output()
  loginConfig!: LoginConfig | null;

  constructor(private authService: AuthorizationService) {}

  onLoginButtonClick(): void {
    this.loginConfig = {
      onWindowClosed: () => {
        this.loginConfig = null;
      },
    };
  }

  getUserObservable(): Observable<User> {
    return this.authService.user$;
  }
}
