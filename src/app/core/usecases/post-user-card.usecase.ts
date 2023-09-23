import { Injectable } from '@angular/core';
import { UseCase } from '../base/usecase';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api/api.service';
import { Card } from '../models/card.model';
import { StoreService } from '../services/store/store.service';

@Injectable({
  providedIn: 'root',
})
export class PostUserCardUseCase extends UseCase {
  constructor(private storeService: StoreService,
              private apiService: ApiService) {
    super();
  }

  invoke(uid: string, card: Card): Observable<void> {
    return this.apiService.requestHandler(() => {
      return this.storeService.postUserCard(uid, card)
    }, (error) => {
      console.log(error);
    });
  }
}
