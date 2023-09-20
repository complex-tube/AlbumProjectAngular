import { createAction, props } from '@ngrx/store';

export namespace CardsActions {
  export const getCards = createAction(
    '[Cards List] Get Cards',
    props<{
      cards: {
        id: number;
        title: string;
        description: string;
        image: {
          cardId: number;
          name: string;
          path: string;
          url: string;
        };
      }[];
    }>(),
  );
}
