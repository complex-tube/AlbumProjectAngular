import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ViewCardWindowSelectors } from '../../../../core/selectors/view-card-window.selectors';
import { Card } from '../../../../core/models/card.model';
import { ViewCardWindowActions } from '../../../../core/actions/view-card-window.actions';
import { EditCardWindowActions } from '../../../../core/actions/edit-card-window.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'album-view-card-window',
  templateUrl: './view-card-window.component.html',
  styleUrls: ['./view-card-window.component.scss'],
})
export class ViewCardWindowComponent implements OnDestroy {
  card!: Card;

  card$!: Observable<Card | null>;
  cardSub!: Subscription;

  constructor(private store: Store, private router: Router) {
    this.card$ = this.store.select(ViewCardWindowSelectors.selectViewCardWindowCard);
    this.cardSub = this.card$.subscribe((card) => {
      if (card) {
        this.card = card;
      }
    });
  }

  ngOnDestroy() {
    this.cardSub.unsubscribe();
  }

  closeWindow() {
    this.store.dispatch(ViewCardWindowActions.closeWindow());
    this.router.navigate(['/collage']);
  }

  toEdit() {
    if (this.card) {
      this.store.dispatch(EditCardWindowActions.showWindow({ card: this.card }));
      this.router.navigate(['collage/card', this.card.id, 'edit']);
    }
  }
}
