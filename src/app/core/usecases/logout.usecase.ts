import { UseCase } from '../base/usecase';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization/authorization.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutUseCase extends UseCase {
  constructor(private authService: AuthorizationService) {
    super();
  }

  invoke(): Observable<void> {
    return this.authService.logout((error) => {
      console.log(error);
    });
  }
}
