import { createAction } from '@ngrx/store';

export namespace AuthWindowActions {
  export const setRegisterAuthType = createAction('[Auth Window] Change To Registration');
  export const setLoginAuthType = createAction('[Auth Window] Change To Login');
  export const closeWindow = createAction('[Auth Window] Close Window');
  export const showWindow = createAction('[Auth Window] Show Window');
}
