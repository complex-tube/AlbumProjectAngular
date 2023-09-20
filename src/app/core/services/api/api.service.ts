import { Injectable } from '@angular/core';
import { catchError, defer, EMPTY, Observable } from 'rxjs';
import { ApiError } from '../../types/api-error';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  requestHandler<Type>(request: Promise<Type>, onError: ApiError): Observable<Type> {
    return defer(() => {
      return request;
    }).pipe(
      catchError((error: unknown) => {
        onError(error);
        return EMPTY;
      }),
    );
  }
}
