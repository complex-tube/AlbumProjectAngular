import { createReducer, on } from '@ngrx/store';
import { LoginActions } from '../actions/login.actions';
import { User } from '../models/user.model';

const initialUserState: User = {
  uid: '',
};

export const loginReducer = createReducer(
  initialUserState,
  on(
    LoginActions.setUserCredentialsByLogin,
    (user, { uid }): User => ({
      ...user,
      uid: uid,
    }),
  ),
);
