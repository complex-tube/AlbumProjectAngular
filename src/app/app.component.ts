import { Component } from '@angular/core';
import { BaseComponent } from './core/base/base-component';
import { AuthorizationService } from './core/services/authorization/authorization.service';
import { map, Observable } from 'rxjs';
import { User } from './core/models/user.model';

@Component({
  selector: 'album-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent {
  constructor(private authService: AuthorizationService) {
    super();
  }

  getUserObservable(): Observable<User> {
    return this.authService.user$;
  }

  protected readonly map = map;
}
