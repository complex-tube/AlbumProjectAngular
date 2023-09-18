import { Card } from '../../main/cards-list/models/card';

export interface User {
  uid?: string;
  email?: string;
  password?: string;
  cardsList?: Card[];
}
