import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Storage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage = inject(Storage);

  constructor(private apiService: ApiService) {}

  getListOfSMTH(): void {}
}
