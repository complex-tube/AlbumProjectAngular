import { Injectable } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';

import { AngularFireStorage } from '@angular/fire/compat/storage';

import { ApiService } from '../api/api.service';
import { ApiError } from '../../types/api-error';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor(
    private storage: AngularFireStorage,
    private apiService: ApiService
  ) {
  }

  uploadCard(uid: string, number: number, format: string, data: File, onError: ApiError) {
    return this.apiService.requestHandler(() => {
      return this.storage.upload(`${uid}/cards/${number}.${format}`, data).then((file) => {
        console.log(file);
      });
    }, onError);
  }

  getCardURL(uid: string, number: number, onError: ApiError) {
    return this.storage.ref(`${uid}/cards/${number}.jpg`).getDownloadURL()
      .pipe(
        catchError((err: unknown) => {
          onError(err);
          return EMPTY;
        })
      );
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
