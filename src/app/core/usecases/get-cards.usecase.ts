import { Injectable } from '@angular/core';
import { UseCase } from '../base/usecase';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';
import { StoreService } from '../services/store/store.service';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root',
})
export class GetCardsUseCase extends UseCase {
  constructor(private storeService: StoreService) {
    super();
  }

  invoke(uid: string): Observable<Card[]> {
    return this.storeService.getUserCardsList(uid, (error: any) => {
      console.log(error);
    });
  }
}
