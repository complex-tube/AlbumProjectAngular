import { Injectable } from '@angular/core';
import { from, map, mergeMap, switchMap, toArray } from 'rxjs';

import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Store } from '@ngrx/store';
import { CardsActions } from '../../actions/cards.actions';
import { Card } from '../../models/card.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    private storage: AngularFireStorage,
    private store: Store,
  ) {}

  getListOfCards() {
    this.storage
      .ref('/3zGyjV3TJFeOLr04w5qiD7hsOVd2')
      .listAll()
      .pipe(
        map((item) => item.items),
        switchMap((refItems) => {
          return from(refItems);
        }),
        mergeMap((ref) => {
          return from(ref.getDownloadURL());
        }),
        toArray(),
      )
      .subscribe((urls) => {
        const cards: Card[] = urls.map((url) => {
          return {
            id: 0,
            title: '',
            description: '',
            image: {
              cardId: 0,
              name: '',
              path: '',
              url: url,
            },
          };
        });
        this.store.dispatch(CardsActions.getCards({ cards: cards }));
      });
  }
}
