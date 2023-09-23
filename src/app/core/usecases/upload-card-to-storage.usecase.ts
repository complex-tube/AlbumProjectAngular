import { Injectable } from '@angular/core';
import { UseCase } from '../base/usecase';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UploadCardToStorageUseCase extends UseCase {
  constructor(private storageService: StorageService) {
    super();
  }

  invoke(uid: string, number: number, fileFormat: string, file: File): Observable<void> {
    return this.storageService.uploadCard(uid, number,fileFormat,file,(error: any) => {
      console.log(error);
    });
  }
}
