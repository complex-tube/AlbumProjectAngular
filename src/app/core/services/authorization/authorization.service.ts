import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import { from, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import UserCredential = firebase.auth.UserCredential;
import { AuthSelectors } from '../../selectors/auth.selector';
import { User } from '../../models/user.model';
import { LoginSelectors } from '../../selectors/login.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  signInUserCredential$!: Observable<UserCredential | null>;

  registerUserCredential$!: Observable<UserCredential | void>;

  currentAuthType$!: Observable<AuthType>;

  user$!: Observable<User>;

  constructor(
    private auth: AngularFireAuth,
    private store: Store,
  ) {
    this.currentAuthType$ = this.store.select(AuthSelectors.selectAuthTypeState);
    this.user$ = this.store.select(LoginSelectors.selectLoginState);
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
