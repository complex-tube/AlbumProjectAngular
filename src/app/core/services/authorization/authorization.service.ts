import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import { filter, Observable, tap } from 'rxjs';
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
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  currentAuthType$!: Observable<AuthType>;

  constructor(
    private auth: AngularFireAuth,
    private store: Store,
    private apiService: ApiService,
  ) {
    this.currentAuthType$ = this.store.select(AuthSelectors.selectAuthTypeState);
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
      this.auth.onAuthStateChanged((user) => {
        console.log('auth service login existed user');
        this.store.dispatch(UserActions.loginExistedUser({
          uid: user != null ? user.uid : '',
          email: user != null && user.email ? user.email: ''}));
        }
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
