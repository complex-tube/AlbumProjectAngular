import { createReducer, on } from '@ngrx/store';
import { CardsActions } from '../actions/cards.actions';
import { Card } from '../models/card.model';

export interface CardsState {
  cards: Card[];
}

const initialCardsState: CardsState = {
  cards: [],
};

export const cardsReducer = createReducer(
  initialCardsState,
  on(
    CardsActions.getCards,
    (_cards, { cards }): CardsState => ({
      ..._cards,
      cards: cards,
    }),
  ),
  on(
    CardsActions.clearCards,
    (_cards): CardsState => ({
      ..._cards,
      cards: []
    }),
  ),
  on(
    CardsActions.deleteCard,
    (_cards, {cardId}) => ({
      ..._cards,
      cards: _cards.cards.filter((cardFromState) => cardFromState.id != cardId)
    })
  )
);
