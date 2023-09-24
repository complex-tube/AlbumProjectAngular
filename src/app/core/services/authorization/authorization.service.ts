import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import UserCredential = firebase.auth.UserCredential;
import { ApiService } from '../api/api.service';
import { ApiError } from '../../types/api-error';
import { AuthUserData } from '../../models/api/auth-user-data.model';
import { UserSelectors } from '../../selectors/user.selectors';
import { UserActions } from '../../actions/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {

  constructor(
    private auth: AngularFireAuth,
    private store: Store,
    private apiService: ApiService,
  ) {
    this.auth.setPersistence('session').then(() => {
      console.log('session');
    });
  }

  login(data: AuthUserData, onError: ApiError): Observable<UserCredential> {
    return this.apiService.requestHandler(
      () => {
        console.log(data);
        return this.auth.signInWithEmailAndPassword(data.email, data.password)
      },
      onError,
    );
  }

  register(data: AuthUserData, onError: ApiError): Observable<UserCredential> {
    return this.apiService.requestHandler(
      () => {
        return this.auth.createUserWithEmailAndPassword(data.email, data.password)
      },
      onError,
    );
  }

  loginExisted(onError: ApiError) {
    return this.apiService.requestHandler(
      () => {
        return this.auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            const userExistedSubscription = this.store.select(UserSelectors.selectUserState)
              .subscribe((user) => {
                if (!user.isUserAlreadyWasExisted && authUser.email) {
                  this.store.dispatch(UserActions.loginExistedUser({uid: authUser.uid, email: authUser.email}));
                }
              });
            userExistedSubscription.unsubscribe();
          }
        })
      }, onError);
  }

  logout(onError: ApiError): Observable<void> {
    return this.apiService.requestHandler(
      () => {
        return this.auth.signOut()
      },
      onError);
  }
}

export enum AuthType {
  LOGIN,
  REGISTRATION,
}
