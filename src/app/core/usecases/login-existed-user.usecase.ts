import { Injectable } from '@angular/core';
import { UseCase } from '../base/usecase';
import { AuthorizationService } from '../services/authorization/authorization.service';
import { Observable, tap } from 'rxjs';
import firebase from 'firebase/compat';
import Unsubscribe = firebase.Unsubscribe;

@Injectable({
  providedIn: 'root',
})
export class LoginExistedUserUseCase extends UseCase {
  constructor(private authService: AuthorizationService) {
    super();
  }

  invoke(): Observable<Unsubscribe> {
    return this.authService
      .loginExisted((error) => {
        console.log(error);
      })
      .pipe(tap((item) => console.log(item)));
  }
}
