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
        date: string;
      }[];
    }>(),
  );

  export const clearCards = createAction(
    '[Header Layout] Clear Cards',
  )

  export const deleteCard = createAction(
    '[Edit Card Window] Delete Card',
    props<{
      cardId: number
    }>()
  )
}
