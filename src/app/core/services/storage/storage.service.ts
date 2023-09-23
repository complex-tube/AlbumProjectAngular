import { Injectable } from '@angular/core';
import { from, map, mergeMap, Observable, switchMap, toArray } from 'rxjs';

import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Store } from '@ngrx/store';
import { Card } from '../../models/card.model';
import { CardsSelectors } from '../../selectors/cards.selectors';
import { CardsState } from '../../reducers/cards.reducer';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor(
    private storage: AngularFireStorage,
    private store: Store,
  ) {
  }

  uploadCard() {

  }

  deleteCard() {

  }

  updateCard() {

  }

  // uploadCard() {
  //   this.storage.upload()
  // }

  // getListOfCards(uid: string): Observable<Card[]> {
  //   return this.storage
  //     .ref(`/${uid}`)
  //     .listAll()
  //     .pipe(
  //       map((item) => item.items),
  //       switchMap((refItems) => {
  //         return from(refItems);
  //       }),
  //       mergeMap((ref) => {
  //         return from(ref.getDownloadURL());
  //       }),
  //       toArray(),
  //       map((urls): Card[] => {
  //         const cards: Card[] = [];
  //         urls.forEach((url) => {
  //           cards.push({
  //             title: '',
  //             description: '',
  //             url: url,
  //           });
  //         });
  //         return cards;
  //       }),
  //     );
  // }
}
