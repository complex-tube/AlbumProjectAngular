import { UseCase } from '../base/usecase';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import firebase from 'firebase/compat';
import UserCredential = firebase.auth.UserCredential;
import { AuthorizationService } from '../services/authorization/authorization.service';
import { AuthUserData } from '../models/api/auth-user-data.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterUseCase extends UseCase {
  constructor(private authService: AuthorizationService) {
    super();
  }

  invoke(data: AuthUserData): Observable<User> {
    return this.authService
      .register(data, (error) => {
        console.log(error);
      })
      .pipe(
        tap((userCredentials) => {
          console.log(userCredentials);
        }),
        map((userCredential): User => {
          if (userCredential.user && userCredential.user.email) {
            return {
              uid: userCredential.user.uid,
              email: userCredential.user.email
            }
          } else {
            return {
              uid: '',
              email: ''
            }
          }
        })
      );
  }
}
