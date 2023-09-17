import { createReducer, on } from '@ngrx/store';
import { AuthType } from '../services/authorization/authorization.service';
import { AuthActions } from '../actions/auth.actions';

export const authReducer = createReducer(
  AuthType.LOGIN,
  on(AuthActions.setRegisterAuthType, (): AuthType => AuthType.REGISTRATION),
  on(AuthActions.setLoginAuthType, (): AuthType => AuthType.LOGIN),
);
