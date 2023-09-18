import { Component, OnInit } from '@angular/core';
import { BaseComponent } from './core/base/base-component';
import { AuthorizationService } from './core/services/authorization/authorization.service';
import { Observable } from 'rxjs';
import { User } from './core/models/user.model';
import { LoginExistedUserUseCase } from './core/usecases/login-existed-user.usecase';
import { StorageService } from './core/services/storage/storage.service';

@Component({
  selector: 'album-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit {
  constructor(
    private authService: AuthorizationService,
    private storageService: StorageService,
    private loginExistedUserUseCase: LoginExistedUserUseCase,
  ) {
    super();
  }

  ngOnInit() {
    this.loginExistedUserUseCase.invoke();
    // this.storageService.getListOfSMTH();
  }

  getUserObservable(): Observable<User> {
    return this.authService.user$;
  }
}
