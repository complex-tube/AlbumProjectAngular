import { createAction, props } from '@ngrx/store';

export namespace UserActions {
  export const loginUser = createAction('[Login Layout] Login User', props<{ uid: string, email: string }>());
  export const registerUser = createAction(
    '[Registration layout] Register User',
    props<{ uid: string, email: string }>(),
  );
  export const loginExistedUser = createAction(
    '[App] Login Existed User',
    props<{ uid: string, email: string }>(),
  );

  export const logoutUser = createAction('[Header Layout] Logout User', props<{ uid: string, email: string }>());
}
