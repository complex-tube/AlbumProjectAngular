import { createAction, props } from '@ngrx/store';
import { Card } from '../models/card.model';

export namespace EditCardWindowActions {
  export const closeWindow = createAction('[Edit Card Window] Close Window');
  export const showWindow = createAction('[Edit Card Window] Show Window', props<{card: Card}>());
}
