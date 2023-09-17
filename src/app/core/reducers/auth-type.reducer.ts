import { createReducer, on } from '@ngrx/store';
import { AuthType } from '../services/authorization/authorization.service';
import { AuthTypeActions } from '../actions/auth-type.actions';

export const authTypeReducer = createReducer(
  AuthType.LOGIN,
  on(AuthTypeActions.setRegisterAuthType, (): AuthType => AuthType.REGISTRATION),
  on(AuthTypeActions.setLoginAuthType, (): AuthType => AuthType.LOGIN),
);
