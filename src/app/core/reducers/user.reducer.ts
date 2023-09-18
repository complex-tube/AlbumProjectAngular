import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import { UserActions } from '../actions/user.actions';
import { CardsActions } from '../actions/cards.actions';

const initialUserState: User = {
  uid: '',
  email: '',
  password: '',
  cardsList: [],
};

export const userReducer = createReducer(
  initialUserState,
  on(
    UserActions.loginUser,
    (user, { uid }): User => ({
      ...user,
      uid: uid,
    }),
  ),
  on(
    UserActions.registerUser,
    (user, { uid }): User => ({
      ...user,
      uid: uid,
    }),
  ),
  on(
    UserActions.loginExistedUser,
    (user, { uid }): User => ({
      ...user,
      uid: uid,
    }),
  ),
  on(
    UserActions.logoutUser,
    (user, { uid }): User => ({
      ...user,
      uid: uid,
    }),
  ),
  on(
    CardsActions.createImagesFolder,
    (user): User => ({
      ...user,
    }),
  ),
);
