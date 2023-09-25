import { createReducer, on } from '@ngrx/store';
import { Card } from '../models/card.model';
import { ViewCardWindowActions } from '../actions/view-card-window.actions';

export interface ViewCardWindowConfig {
  card: Card | null;
  isShown: boolean;
}

const initialViewCardWindowReducer: ViewCardWindowConfig = {
  card: null,
  isShown: false
}
export const viewCardWindowReducer = createReducer(
  initialViewCardWindowReducer,
  on(ViewCardWindowActions.closeWindow, (state) => ({
    ...state,
    isShown: false,
    card: null
  })),
  on(ViewCardWindowActions.showWindow, (state,{card}) => ({
    ...state,
    isShown: true,
    card: card
  }))
);
