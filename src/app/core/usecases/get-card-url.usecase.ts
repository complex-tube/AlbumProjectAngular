import { Injectable } from '@angular/core';
import { UseCase } from '../base/usecase';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class GetCardUrlUseCase extends UseCase {
  constructor(private storageService: StorageService) {
    super();
  }

  invoke(uid: string, cardId: number): Observable<string> {
    return this.storageService.getCardURL(uid, cardId, (error: any) => {
      console.log(error);
    });
  }
}
