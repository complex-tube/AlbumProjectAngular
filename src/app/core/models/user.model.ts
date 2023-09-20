import { Card } from './card.model';

export interface User {
  uid: string;
  email: string;
  cardsList: Card[];
}
