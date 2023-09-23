import { Injectable } from '@angular/core';
import { UseCase } from '../base/usecase';
import { filter, map, Observable, tap } from 'rxjs';
import { AuthorizationService } from '../services/authorization/authorization.service';
import firebase from 'firebase/compat';
import UserCredential = firebase.auth.UserCredential;
import { AuthUserData } from '../models/api/auth-user-data.model';
import { Store } from '@ngrx/store';
import { UserActions } from '../actions/user.actions';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase extends UseCase {
  constructor(private authService: AuthorizationService) {
    super();
  }

  invoke(data: AuthUserData): Observable<User> {
    return this.authService
      .login(data, (error: any) => {
        console.log(error.code);
      }).pipe(
        map((userCredential): User => {
          if (userCredential.user && userCredential.user.email) {
            return {
              uid: userCredential.user.uid,
              email: userCredential.user.email,
              isUserAlreadyWasExisted: true,
            }
          } else {
            return {
              uid: '',
              email: '',
              isUserAlreadyWasExisted: true,
            }
          }
        })
      )
  }
}
