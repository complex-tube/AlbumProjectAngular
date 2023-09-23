import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ApiService } from '../api/api.service';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import firebase from 'firebase/compat';
import { User } from '../../models/user.model';
import { ApiError } from '../../types/api-error';
import { Card } from '../../models/card.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  user$!: Observable<User>;
  constructor(
    private firestore: AngularFirestore,
    private apiService: ApiService,
  ) {}

  checkExistedUser(uid: string): Observable<boolean> {
    return this.firestore
      .doc(`users/${uid}`)
      .get()
      .pipe(
        map((get: firebase.firestore.DocumentSnapshot<any>): boolean => {
          return get.exists;
        }),
      );
  }

  getUser(uid: string): Observable<User> {
    return this.firestore
      .doc(`users/${uid}`)
      .valueChanges()
      .pipe(
        map((get: any): User => {
          return {
            uid: get.uid,
            email: get.email,
            isUserAlreadyWasExisted: true,
          };
        }),
      );
  }

  setUser(uid: string, data: User, onError: ApiError): Observable<void> {
    return this.apiService.requestHandler(
      () => {
        return this.firestore.doc(`users/${uid}`).set(data)
      },
      onError);
  }

  updateUserEmail(uid: string, email: { email: string }, onError: ApiError) {
    return this.apiService.requestHandler(
      () => {
        return this.firestore.doc(`users/${uid}`).update(email)
      },
      onError,
    );
  }

  setUserCardsList(uid: string, cardsList: Card[]) {
    cardsList.forEach((card, index) => {
      this.apiService.requestHandler(
        () => {
          return this.firestore.doc(`users/${uid}/cards/${index}`).set(card)
        },
        () => {}
      ).subscribe(() => {
        console.log('success');
      })
    });
  }

  getUserCardsList(uid: string, onError: ApiError) {
    console.log(`users/${uid}/cards`);
    return this.firestore.doc(`users/${uid}`).collection('/cards').valueChanges()
      .pipe(
        catchError((err) => {
          onError(err);
          return EMPTY
        }),
        map((data: firebase.firestore.DocumentData[]): Card[] => {
          const cards: Card[] = [];
          data.forEach((d) => {
            cards.push({
              title: d['title'],
              description: d['description'],
              url: d['url']
            });
          });
          return cards;
        })
      )
  }
}
