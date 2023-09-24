import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Window } from '../../../core/base/window';
import { Store } from '@ngrx/store';
import { EditCardWindowActions } from '../../../core/actions/edit-card-window.actions';
import { filter, Observable, Subscription, switchMap } from 'rxjs';
import { Card } from '../../../core/models/card.model';
import { EditCardWindowSelectors } from '../../../core/selectors/edit-card-window.selectors';
import { StorageService } from '../../../core/services/storage/storage.service';
import { StoreService } from '../../../core/services/store/store.service';
import { User } from '../../../core/models/user.model';
import { UserSelectors } from '../../../core/selectors/user.selectors';
import { CardsActions } from '../../../core/actions/cards.actions';

@Component({
  selector: 'album-edit-card-window',
  templateUrl: './edit-card-window.component.html',
  styleUrls: ['./edit-card-window.component.scss']
})
export class EditCardWindowComponent extends Window implements OnInit, OnDestroy {

  editCardWindowCard$!: Observable<Card | null>;
  editCardWindowCardSubscription!: Subscription;

  card!: Card;
  user!: User;
  constructor(protected override renderer: Renderer2,
              private store: Store,
              private storageService: StorageService,
              private storeService: StoreService) {
    super(renderer);
    this.editCardWindowCard$ = this.store.select(EditCardWindowSelectors.selectEditCardWindowCard)
      .pipe(
        filter(card => !!card)
      );
    this.editCardWindowCardSubscription = this.editCardWindowCard$.subscribe((card) => {
      if (card) {
        this.card = card;
      }
    });
    this.store.select(UserSelectors.selectUserState).subscribe(user => {
      this.user = user;
    });
  }

  closeWindow() {
    this.store.dispatch(EditCardWindowActions.closeWindow());
  }

  deleteCard() {
    console.log('edit card window delete card from storage');
    this.storageService.deleteCard(this.user.uid, this.card.id, (error: any) => {
      console.log(error.code);
    }).pipe(
      switchMap(() => {
        console.log('edit card window delete card from firestore');
        return this.storeService.deleteUserCard(this.user.uid, this.card.id, (error: any) => {
          console.log(error.code);
        });
      })
    ).subscribe(() => {
      console.log('edit card window delete card dispatch');
      this.store.dispatch(CardsActions.deleteCard({cardId: this.card.id}));
      this.closeWindow();
    });
  }

}
