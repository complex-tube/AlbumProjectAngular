import { createAction } from '@ngrx/store';

export namespace AuthActions {
  export const setRegisterAuthType = createAction('[Auth Window] Change To Registration');
  export const setLoginAuthType = createAction('[Auth Window] Change To Login');
}
