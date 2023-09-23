import { createAction, props } from '@ngrx/store';

export namespace CardsActions {
  export const getCards = createAction(
    '[Cards List] Get Cards',
    props<{
      cards: {
        id: number;
        title: string;
        description: string;
        url: string;
      }[];
    }>(),
  );

  export const clearCards = createAction(
    '[Header Layout] Clear Cards',
  )
}
