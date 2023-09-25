import { createReducer, on } from '@ngrx/store';
import { EditCardWindowActions } from '../actions/edit-card-window.actions';
import { Card } from '../models/card.model';

export interface EditCardWindowConfig {
  card: Card | null;
  isShown: boolean;
}

const initialEditCardWindowReducer: EditCardWindowConfig = {
  card: null,
  isShown: false
}
export const editCardWindowReducer = createReducer(
  initialEditCardWindowReducer,
  on(EditCardWindowActions.closeWindow, (state) => ({
    ...state,
    isShown: false,
    card: null
  })),
  on(EditCardWindowActions.showWindow, (state,{card}) => ({
    ...state,
    isShown: true,
    card: card
  }))
);
