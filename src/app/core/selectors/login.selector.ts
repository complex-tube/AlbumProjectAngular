import { createFeatureSelector } from '@ngrx/store';
import { User } from '../models/user.model';

export namespace LoginSelectors {
  export const loginState = createFeatureSelector<User>('loginReducer');
}
