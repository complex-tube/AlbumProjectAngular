import { Component, Input, OnInit } from '@angular/core';
import { Card } from './models/card';

@Component({
  selector: 'album-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
})
export class CardsListComponent implements OnInit {
  @Input()
  cardOffset!: number;

  cards: Card[] = [];

  ngOnInit(): void {
    this.cards.push({ name: 'Lesha', description: 'Lesha' });
    this.cards.push({ name: 'Lesha', description: 'Lesha' });
    this.cards.push({ name: 'Lesha', description: 'Lesha' });
    this.cards.push({ name: 'Lesha', description: 'Lesha' });
    this.cards.push({ name: 'Lesha', description: 'Lesha' });
  }
}
