import { Injectable } from '@angular/core';
import { UseCase } from '../base/usecase';
import { Observable, tap } from 'rxjs';
import { AuthorizationService } from '../services/authorization/authorization.service';
import firebase from 'firebase/compat';
import UserCredential = firebase.auth.UserCredential;
import { AuthUserData } from '../models/api/auth-user-data.model';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase extends UseCase {
  constructor(private authService: AuthorizationService) {
    super();
  }

  invoke(data: AuthUserData): Observable<UserCredential> {
    return this.authService
      .login(data, (error: any) => {
        console.log(error.code);
      })
      .pipe(
        tap((userCredential) => {
          console.log(userCredential);
        }),
      );
  }
}
