import { User } from '../models/user.model';
import { createReducer, on } from '@ngrx/store';
import { RegistrationActions } from '../actions/registration.actions';

const initialStateUser: User = {
  uid: '',
};

export const registrationReducer = createReducer(
  initialStateUser,
  on(
    RegistrationActions.registerUser,
    (user: User, { uid }): User => ({
      ...user,
      uid: uid,
    }),
  ),
);
