import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import { from, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import UserCredential = firebase.auth.UserCredential;
import { AuthSelectors } from '../../selectors/auth.selectors';
import { User } from '../../models/user.model';
import { LoginSelectors } from '../../selectors/login.selectors';
import { ApiService } from '../api/api.service';
import { ApiError } from '../../types/api-error';
import { AuthUserData } from '../../models/api/auth-user-data.model';
import { RegistrationSelectors } from '../../selectors/registration.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  signInUserCredential$!: Observable<UserCredential | null>;

  registerUserCredential$!: Observable<UserCredential | void>;

  currentAuthType$!: Observable<AuthType>;

  loginUser$!: Observable<User>;
  registerUser$!: Observable<User>;

  constructor(
    private auth: AngularFireAuth,
    private store: Store,
    private apiService: ApiService,
  ) {
    this.currentAuthType$ = this.store.select(AuthSelectors.selectAuthTypeState);
    this.loginUser$ = this.store.select(LoginSelectors.selectLoginState);
    this.registerUser$ = this.store.select(RegistrationSelectors.selectRegistrationState);
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

  getSignInObservable(email: string, password: string): Observable<UserCredential | null> {
    this.signInUserCredential$ = from(
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials) => userCredentials)
        .catch(null),
    );
    return this.signInUserCredential$;
  }

  getRegisterObservable(email: string, password: string): Observable<any> {
    this.registerUserCredential$ = from(this.auth.createUserWithEmailAndPassword(email, password));
    return this.registerUserCredential$;
  }
}

export enum AuthType {
  LOGIN,
  REGISTRATION,
}
