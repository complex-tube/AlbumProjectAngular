import { createFeatureSelector } from '@ngrx/store';
import { AuthType } from '../services/authorization/authorization.service';

export namespace AuthSelectors {
  export const selectAuthTypeState = createFeatureSelector<AuthType>('authState');
}
