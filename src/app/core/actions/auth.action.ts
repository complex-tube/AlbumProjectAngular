import { createAction } from '@ngrx/store';

export namespace AuthActions {
  export const setRegisterAuthType = createAction('Change To Registration');
  export const setLoginAuthType = createAction('Change To Login');
}
