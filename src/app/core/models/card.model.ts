import { Image } from './image.model';

export interface Card {
  id: number;
  title: string;
  description: string;
  image: Image;
}
