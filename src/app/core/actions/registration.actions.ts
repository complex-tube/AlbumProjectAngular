import { createAction, props } from '@ngrx/store';

export namespace RegistrationActions {
  export const registerUser = createAction(
    '[Registration layout] Register User',
    props<{ uid: string }>(),
  );
}
