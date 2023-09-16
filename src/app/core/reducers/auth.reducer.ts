import { createReducer, on } from '@ngrx/store';
import { AuthType } from '../services/authorization/authorization.service';
import { AuthActions } from '../actions/auth.action';

export const authReducer = createReducer(
  AuthType.LOGIN,
  on(AuthActions.setRegisterAuthType, () => AuthType.REGISTRATION),
  on(AuthActions.setLoginAuthType, () => AuthType.LOGIN),
);
