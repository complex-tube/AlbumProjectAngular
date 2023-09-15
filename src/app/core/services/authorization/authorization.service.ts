import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import User = firebase.User;
import {from, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  user!: User | null;

  authTypeSubject!: Subject<AuthType>;

  constructor(private auth: AngularFireAuth) {
    this.authTypeSubject = new Subject<AuthType>();
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
  REGISTRATION
}
