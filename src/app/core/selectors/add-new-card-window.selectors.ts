import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AddNewCardWindowConfig } from '../reducers/add-new-card-window.reducer';

export namespace AddNewCardWindowSelectors {
  export const selectAddNewCardWindowState = createFeatureSelector<AddNewCardWindowConfig>('addNewCardWindowState');
  export const selectAddNewCardWindowShown = createSelector(selectAddNewCardWindowState, (config) => {return config.isShown})
}
