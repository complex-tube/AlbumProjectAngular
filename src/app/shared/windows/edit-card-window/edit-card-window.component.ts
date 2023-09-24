import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Window } from '../../../core/base/window';
import { Store } from '@ngrx/store';
import { EditCardWindowActions } from '../../../core/actions/edit-card-window.actions';
import { filter, Observable, Subscription } from 'rxjs';
import { Card } from '../../../core/models/card.model';
import { EditCardWindowSelectors } from '../../../core/selectors/edit-card-window.selectors';

@Component({
  selector: 'album-edit-card-window',
  templateUrl: './edit-card-window.component.html',
  styleUrls: ['./edit-card-window.component.scss']
})
export class EditCardWindowComponent extends Window implements OnInit, OnDestroy {

  editCardWindowCard$!: Observable<Card | null>;
  editCardWindowCardSubscription!: Subscription;
  constructor(protected override renderer: Renderer2,
              private store: Store) {
    super(renderer);
    this.editCardWindowCard$ = this.store.select(EditCardWindowSelectors.selectEditCardWindowCard)
      .pipe(
        filter(card => !!card)
      );
    this.editCardWindowCardSubscription = this.editCardWindowCard$.subscribe((card) => {

    });
  }

  closeWindow() {
    this.store.dispatch(EditCardWindowActions.closeWindow());
  }

}
