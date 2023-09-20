import { Injectable } from '@angular/core';
import { UseCase } from '../base/usecase';
import { StorageService } from '../services/storage/storage.service';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root',
})
export class GetCardsUseCase extends UseCase {
  constructor(private storageService: StorageService) {
    super();
  }

  invoke(): Observable<Card[]> {
    return this.storageService.getListOfCards();
  }
}
