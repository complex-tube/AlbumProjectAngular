import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import { UserActions } from '../actions/user.actions';

const initialUserState: User = {
  uid: '',
  email: '',
  isUserAlreadyWasExisted: false
};

export const userReducer = createReducer(
  initialUserState,
  on(
    UserActions.loginUser,
    (user, { uid, email }): User => ({
      ...user,
      uid: uid,
      email: email,
      isUserAlreadyWasExisted: true,
    }),
  ),
  on(
    UserActions.registerUser,
    (user, { uid, email }): User => ({
      ...user,
      uid: uid,
      email: email,
      isUserAlreadyWasExisted: true,
    }),
  ),
  on(
    UserActions.loginExistedUser,
    (user, { uid, email }): User => ({
      ...user,
      uid: uid,
      email: email,
      isUserAlreadyWasExisted: true,
    }),
  ),
  on(
    UserActions.logoutUser,
    (user, { uid, email }): User => ({
      ...user,
      uid: uid,
      email: email,
      isUserAlreadyWasExisted: true,
    }),
  )
);
