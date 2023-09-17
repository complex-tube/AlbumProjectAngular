import { createReducer, on } from '@ngrx/store';
import { LoginActions } from '../actions/login.actions';
import { User } from '../models/user.model';
import { RegistrationActions } from '../actions/registration.actions';

const initialUserState: User = {
  uid: '',
};

export const userReducer = createReducer(
  initialUserState,
  on(
    LoginActions.setUserCredentialsByLogin,
    (user, { uid }): User => ({
      ...user,
      uid: uid,
    }),
  ),
  on(
    RegistrationActions.registerUser,
    (user, { uid }): User => ({
      ...user,
      uid: uid,
    }),
  ),
);
