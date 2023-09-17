import { createFeatureSelector } from '@ngrx/store';
import { User } from '../models/user.model';

export namespace RegistrationSelectors {
  export const selectRegistrationState = createFeatureSelector<User>('registrationState');
}
