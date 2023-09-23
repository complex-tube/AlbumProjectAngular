import { createReducer, on } from '@ngrx/store';
import { AddNewCardWindowActions } from '../actions/add-new-card-window.actions';

export interface AddNewCardWindowConfig {
  isShown: boolean;
}

const initialAddNewCardWindowReducer: AddNewCardWindowConfig = {
  isShown: false
}
export const addNewCardWindowReducer = createReducer(
  initialAddNewCardWindowReducer,
  on(AddNewCardWindowActions.closeWindow, (_authWindowState) => ({
    ..._authWindowState,
    isShown: false
  })),
  on(AddNewCardWindowActions.showWindow, (authWindowState) => ({
    ...authWindowState,
    isShown: true
  }))
);
