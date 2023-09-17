import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import UserCredential = firebase.auth.UserCredential;
import { AuthSelectors } from '../../selectors/auth.selectors';
import { User } from '../../models/user.model';
import { ApiService } from '../api/api.service';
import { ApiError } from '../../types/api-error';
import { AuthUserData } from '../../models/api/auth-user-data.model';
import { UserSelectors } from '../../selectors/user.selectors';
import Unsubscribe = firebase.Unsubscribe;
import { UserActions } from '../../actions/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  currentAuthType$!: Observable<AuthType>;

  user$!: Observable<User>;

  constructor(
    private auth: AngularFireAuth,
    private store: Store,
    private apiService: ApiService,
  ) {
    this.currentAuthType$ = this.store.select(AuthSelectors.selectAuthTypeState);
    this.user$ = this.store.select(UserSelectors.selectUserState);
    this.auth.setPersistence('session').then(() => {
      console.log('session');
    });
  }

  login(data: AuthUserData, onError: ApiError): Observable<UserCredential> {
    return this.apiService.requestHandler(
      this.auth.signInWithEmailAndPassword(data.email, data.password),
      onError,
    );
  }

  register(data: AuthUserData, onError: ApiError): Observable<UserCredential> {
    return this.apiService.requestHandler(
      this.auth.createUserWithEmailAndPassword(data.email, data.password),
      onError,
    );
  }

  loginExisted(onError: ApiError): Observable<Unsubscribe> {
    return this.apiService.requestHandler(
      this.auth.onAuthStateChanged((user) =>
        this.store.dispatch(UserActions.loginExistedUser({ uid: user != null ? user.uid : '' })),
      ),
      onError,
    );
  }

  logout(onError: ApiError): Observable<void> {
    return this.apiService.requestHandler(this.auth.signOut(), onError);
  }
}

export enum AuthType {
  LOGIN,
  REGISTRATION,
}
