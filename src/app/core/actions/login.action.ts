import { createAction, props } from '@ngrx/store';

export namespace LoginActions {
  export const setUserCredentialsByLogin = createAction(
    'Set UserModel Credential By Login',
    props<{ uid: string }>(),
  );
}
