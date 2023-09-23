import { createReducer, on } from '@ngrx/store';
import { AuthType } from '../services/authorization/authorization.service';
import { AuthWindowActions } from '../actions/auth-window.actions';

export interface AuthWindowConfig {
  authType: AuthType;
  isShown: boolean;
}

const initialAuthWindowConfig: AuthWindowConfig = {
  authType: AuthType.LOGIN,
  isShown: false
}
export const authWindowReducer = createReducer(
  initialAuthWindowConfig,
  on(AuthWindowActions.setRegisterAuthType, (_authWindowState) => ({
    ..._authWindowState,
    authType: AuthType.REGISTRATION,
  })),
  on(AuthWindowActions.setLoginAuthType, (_authWindowState) => ({
    ..._authWindowState,
    authType: AuthType.LOGIN,
  })),
  on(AuthWindowActions.closeWindow, (_authWindowState) => ({
    ..._authWindowState,
    authType: AuthType.LOGIN,
    isShown: false
  })),
  on(AuthWindowActions.showWindow, (authWindowState) => ({
    ...authWindowState,
    isShown: true
  }))
);
