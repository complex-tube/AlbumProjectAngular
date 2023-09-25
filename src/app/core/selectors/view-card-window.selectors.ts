import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ViewCardWindowConfig } from '../reducers/view-card-window.reducer';

export namespace ViewCardWindowSelectors {
  export const selectViewCardWindowState = createFeatureSelector<ViewCardWindowConfig>('viewCardWindowState');
  export const selectViewCardWindowShown = createSelector(selectViewCardWindowState, (config) => {
    return config.isShown
  });
  export const selectViewCardWindowCard = createSelector(selectViewCardWindowState, (config) => {
    return config.card;
  })
}
