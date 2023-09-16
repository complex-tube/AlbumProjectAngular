import { createReducer, on } from '@ngrx/store';
import { LoginActions } from '../actions/login.action';
import { User } from '../models/user.model';

const initialUserState: User = {
  uid: '',
};

export const loginReducer = createReducer(
  initialUserState,
  on(LoginActions.setUserCredentialsByLogin, (user, { uid }) => ({
    ...user,
    uid: uid,
  })),
);
