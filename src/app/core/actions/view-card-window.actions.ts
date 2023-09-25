import { createAction, props } from '@ngrx/store';
import { Card } from '../models/card.model';

export namespace ViewCardWindowActions {
  export const closeWindow = createAction('[View Card Window] Close Window');
  export const showWindow = createAction('[View Card Window] Show Window', props<{card: Card}>());
}
