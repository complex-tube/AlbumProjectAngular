import { createAction, props } from '@ngrx/store';

export namespace LoginActions {
  export const setUserCredentialsByLogin = createAction(
    '[Login Layout] Set UserModel Credential By Login',
    props<{ uid: string }>(),
  );
}
