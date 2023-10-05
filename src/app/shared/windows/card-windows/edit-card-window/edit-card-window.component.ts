import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription, switchMap } from 'rxjs';
import { Card } from '../../../../core/models/card.model';
import { User } from '../../../../core/models/user.model';
import { StorageService } from '../../../../core/services/storage/storage.service';
import { StoreService } from '../../../../core/services/store/store.service';
import { EditCardWindowSelectors } from '../../../../core/selectors/edit-card-window.selectors';
import { UserSelectors } from '../../../../core/selectors/user.selectors';
import { ViewCardWindowActions } from '../../../../core/actions/view-card-window.actions';
import { EditCardWindowActions } from '../../../../core/actions/edit-card-window.actions';
import { CardsActions } from '../../../../core/actions/cards.actions';
import { Router } from '@angular/router';
import { Window } from '../../../../core/base/window';

@Component({
  selector: 'album-edit-card-window',
  templateUrl: './edit-card-window.component.html',
  styleUrls: ['./edit-card-window.component.scss']
})
export class EditCardWindowComponent extends Window implements OnInit, OnDestroy {

  editCardWindowCard$!: Observable<Card | null>;
  editCardWindowCardSub!: Subscription;

  card!: Card;
  user!: User;
  constructor(protected override renderer: Renderer2,
              private store: Store,
              private storageService: StorageService,
              private storeService: StoreService,
              private router: Router) {
    super(renderer);
    this.editCardWindowCard$ = this.store.select(EditCardWindowSelectors.selectEditCardWindowCard)
      .pipe(
        filter(card => !!card)
      );
    this.editCardWindowCardSub = this.editCardWindowCard$.subscribe((card) => {
      if (card) {
        this.card = card;
      }
    });
    this.store.select(UserSelectors.selectUserState).subscribe(user => {
      this.user = user;
    });
  }

  onBackGroundClicked() {
    this.store.dispatch(ViewCardWindowActions.showWindow({card: this.card}));
    this.closeWindow();
  }

  closeWindow() {
    this.store.dispatch(EditCardWindowActions.closeWindow());
    this.router.navigate(['collage'])
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
