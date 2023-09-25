import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Window } from '../../../core/base/window';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { UserSelectors } from '../../../core/selectors/user.selectors';
import { Card } from '../../../core/models/card.model';
import { CardsSelectors } from '../../../core/selectors/cards.selectors';
import { UploadCardToStorageUseCase } from '../../../core/usecases/upload-card-to-storage.usecase';
import { GetCardUrlUseCase } from '../../../core/usecases/get-card-url.usecase';
import { PostUserCardUseCase } from '../../../core/usecases/post-user-card.usecase';
import { AddNewCardWindowActions } from '../../../core/actions/add-new-card-window.actions';

@Component({
  selector: 'album-add-new-card-window',
  templateUrl: './add-new-card-window.component.html',
  styleUrls: ['./add-new-card-window.component.scss']
})
export class AddNewCardWindowComponent extends Window implements OnInit, OnDestroy {
  @ViewChild('cardNameInput')
  cardNameInput!: ElementRef;

  @ViewChild('cardDateInput')
  cardDateInput!: ElementRef;

  @ViewChild('cardDescriptionInput')
  cardDescriptionInput!: ElementRef;

  @ViewChild('cardUploadInput')
  cardUploadInput!: ElementRef;

  user$!: Observable<User>;
  userSubscription!: Subscription;

  cards$!: Observable<Card[]>;
  cardsSubscription!: Subscription;

  user!: User;
  cards!: Card[];

  uploadCardSubscription!: Subscription;

  constructor(
    protected override renderer: Renderer2,
    private store: Store,
    private uploadCardToStorageUseCase: UploadCardToStorageUseCase,
    private getCardUrlUseCase: GetCardUrlUseCase,
    private postUserCardUseCase: PostUserCardUseCase,
  ) {
    super(renderer);
    this.user$ = this.store.select(UserSelectors.selectUserState);
    this.cards$ = this.store.select(CardsSelectors.selectCards).pipe(map((cardsState) => cardsState.cards));
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
      console.log('add new cards window', user);
    });
    this.cardsSubscription = this.cards$.subscribe((cards) => {
      this.cards = cards;
      console.log('add new cards window', cards);
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.userSubscription.unsubscribe();
    this.cardsSubscription.unsubscribe();
    if (this.uploadCardSubscription != null) {
      this.uploadCardSubscription.unsubscribe();
    }
  }

  uploadCard() {
    let cardId = 0;
    console.log(this.cards.length);
    if (this.cards.length != 0) {
      cardId = Math.max(...this.cards.map((card) => card.id)) + 1;
    }
    const file = this.cardUploadInput.nativeElement.files[0];
    const fileNameSplitted: string[] = file.name.split('.');
    const fileFormat: string = fileNameSplitted[fileNameSplitted.length - 1];

    this.uploadCardSubscription = this.uploadCardToStorageUseCase.invoke(this.user.uid, cardId, fileFormat, file)
      .pipe(
        switchMap(() => {
          console.log("get card url usecase");
          return this.getCardUrlUseCase.invoke(this.user.uid, cardId);
        }),
        switchMap((url) => {
          console.log("post user card usecase", url);
          const card: Card = {
            id: cardId,
            title: this.cardNameInput.nativeElement.value,
            description: this.cardDescriptionInput.nativeElement.value,
            url: url,
            date: this.cardDateInput.nativeElement.value
          };
          return this.postUserCardUseCase.invoke(this.user.uid, card);
        }))
      .subscribe((data) => {
        console.log(data);
        this.store.dispatch(AddNewCardWindowActions.closeWindow());
      });
  }

  closeWindow() {
    this.store.dispatch(AddNewCardWindowActions.closeWindow());
  }
}

// export interface AddNewCardWindowConfig extends WindowConfig {}
