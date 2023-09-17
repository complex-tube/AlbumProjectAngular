import { Component } from '@angular/core';
import { BaseComponent } from './core/base/base-component';
import { Observable } from 'rxjs';
import { User } from './core/models/user.model';
import { AuthorizationService } from './core/services/authorization/authorization.service';

@Component({
  selector: 'album-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent {
  constructor(private authService: AuthorizationService) {
    super();
  }

  getLoginUserObservable(): Observable<User> {
    return this.authService.loginUser$;
  }

  getRegisterUserObservable(): Observable<User> {
    return this.authService.registerUser$;
  }
}
