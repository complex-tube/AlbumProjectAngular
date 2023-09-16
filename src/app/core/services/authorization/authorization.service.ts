import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import User = firebase.User;
import { from, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  user!: User | null;

  currentAuthType$!: Observable<AuthType>;

  constructor(
    private auth: AngularFireAuth,
    private store: Store<{ authType: AuthType }>,
  ) {
    this.currentAuthType$ = this.store.select('authType');
  }

  signInUser(email: string, password: string): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(email, password));
  }

  registerUser(email: string, password: string): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(email, password));
  }
}

export enum AuthType {
  LOGIN,
  REGISTRATION,
}
