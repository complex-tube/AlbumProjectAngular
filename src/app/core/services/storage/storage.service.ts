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
  cardsState$!: Observable<CardsState>;

  constructor(
    private storage: AngularFireStorage,
    private store: Store,
  ) {
    this.cardsState$ = this.store.select(CardsSelectors.selectCards);
  }

  getListOfCards(): Observable<Card[]> {
    return this.storage
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
        map((urls): Card[] => {
          const cards: Card[] = [];
          urls.forEach((url) => {
            cards.push({
              id: 0,
              title: '',
              description: '',
              image: {
                cardId: 0,
                name: '',
                path: '',
                url: url,
              },
            });
          });
          return cards;
        }),
      );
  }
}
