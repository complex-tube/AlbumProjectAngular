import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../core/services/storage/storage.service';
import { Card } from '../../core/models/card.model';
import { filter, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CardsSelectors } from '../../core/selectors/cards.selectors';
import { CardsState } from '../../core/reducers/cards.reducer';

@Component({
  selector: 'album-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
})
export class CardsListComponent implements OnInit {
  cards$!: Observable<CardsState>;

  cards: Card[] = [];

  constructor(
    private storageService: StorageService,
    private store: Store,
  ) {
    this.storageService.getListOfCards();
    this.store
      .select(CardsSelectors.selectCards)
      .pipe(filter((state) => state.cards.length != 0))
      .subscribe((state) => {
        console.log(state.cards);
      });
  }

  ngOnInit(): void {
    this.cards$ = this.store
      .select(CardsSelectors.selectCards)
      .pipe(filter((state) => state.cards.length != 0));
  }
}
