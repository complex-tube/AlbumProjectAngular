import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Card } from '../../../core/models/card.model';
import { ViewCardWindowSelectors } from '../../../core/selectors/view-card-window.selectors';
import { ViewCardWindowActions } from '../../../core/actions/view-card-window.actions';

@Component({
  selector: 'album-view-card-window',
  templateUrl: './view-card-window.component.html',
  styleUrls: ['./view-card-window.component.scss'],
})
export class ViewCardWindowComponent implements OnDestroy {
  card$!: Observable<Card | null>;
  cardSubscription!: Subscription;

  constructor(private store: Store) {
    this.card$ = this.store.select(ViewCardWindowSelectors.selectViewCardWindowCard);
    this.cardSubscription = this.card$.subscribe();
  }

  ngOnDestroy() {
    this.cardSubscription.unsubscribe();
  }

  closeWindow() {
    this.store.dispatch(ViewCardWindowActions.closeWindow());
  }
}
