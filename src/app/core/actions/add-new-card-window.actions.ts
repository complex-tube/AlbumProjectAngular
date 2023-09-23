import { createAction } from '@ngrx/store';

export namespace AddNewCardWindowActions {
  export const closeWindow = createAction('[Add New Card Window] Close Window');
  export const showWindow = createAction('[Add New Card Window] Show Window');
}
