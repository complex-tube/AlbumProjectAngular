import { Injectable } from '@angular/core';
import { catchError, EMPTY, from, Observable } from 'rxjs';
import { ApiError } from '../../types/api-error';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  requestHandler<Type>(request: Promise<Type>, onError: ApiError): Observable<Type> {
    return from(request).pipe(
      catchError((error: unknown) => {
        onError(error);
        return EMPTY;
      }),
    );
  }
}
