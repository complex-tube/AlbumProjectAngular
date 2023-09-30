import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Card } from '../../../core/models/card.model';
import { ViewCardWindowSelectors } from '../../../core/selectors/view-card-window.selectors';
import { ViewCardWindowActions } from '../../../core/actions/view-card-window.actions';
import { EditCardWindowActions } from '../../../core/actions/edit-card-window.actions';

@Component({
  selector: 'album-view-card-window',
  templateUrl: './view-card-window.component.html',
  styleUrls: ['./view-card-window.component.scss'],
})
export class ViewCardWindowComponent implements OnDestroy {
  card!: Card;

  card$!: Observable<Card | null>;
  cardSubscription!: Subscription;

  constructor(private store: Store) {
    this.card$ = this.store.select(ViewCardWindowSelectors.selectViewCardWindowCard);
    this.cardSubscription = this.card$.subscribe((card) => {
      if (card) {
        this.card = card;
      }
    });
  }

  ngOnDestroy() {
    this.cardSubscription.unsubscribe();
  }

  closeWindow() {
    this.store.dispatch(ViewCardWindowActions.closeWindow());
  }

  toEdit() {
    if (this.card) {
      this.store.dispatch(EditCardWindowActions.showWindow({ card: this.card }));
      this.closeWindow();
    }
  }
}
