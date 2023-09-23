import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthWindowConfig } from '../reducers/auth-window.reducer';

export namespace AuthWindowSelectors {
  export const selectAuthWindowState = createFeatureSelector<AuthWindowConfig>('authWindowState');
  export const selectAuthWindowType = createSelector(selectAuthWindowState, (config) => {return config.authType});
  export const selectAuthWindowShown = createSelector(selectAuthWindowState, (config) => {return config.isShown});
}
