import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EditCardWindowConfig } from '../reducers/edit-card-window.reducer';

export namespace EditCardWindowSelectors {
  export const selectEditCardWindowState = createFeatureSelector<EditCardWindowConfig>('editCardWindowState');
  export const selectEditCardWindowShown = createSelector(selectEditCardWindowState, (config) => {return config.isShown});
  export const selectEditCardWindowCard = createSelector(selectEditCardWindowState, (config) => {
    return config.card;
  })
}
