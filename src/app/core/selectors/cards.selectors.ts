import { createFeatureSelector } from '@ngrx/store';
import { CardsState } from '../reducers/cards.reducer';

export namespace CardsSelectors {
  export const selectCards = createFeatureSelector<CardsState>('cardsState');
}
