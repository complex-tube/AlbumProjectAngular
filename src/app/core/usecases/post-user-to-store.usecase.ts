import { Injectable } from '@angular/core';
import { UseCase } from '../base/usecase';
import { Observable } from 'rxjs';
import { StoreService } from '../services/store/store.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class PostUserToStoreUseCase extends UseCase {
  constructor(private storeService: StoreService) {
    super();
  }

  invoke(data: User): Observable<void> {
    return this.storeService.postUser(data, (error: any) => {
      console.log(error.code);
    });
  }
}
