import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Window, WindowConfig } from '../../../core/base/window';
import { LoginConfig } from '../auth-window/auth-window.component';
import { Store } from '@ngrx/store';
import { from, map, Observable, Subscription, switchAll, switchMap } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { UserSelectors } from '../../../core/selectors/user.selectors';
import { StorageService } from '../../../core/services/storage/storage.service';
import { Card } from '../../../core/models/card.model';
import { CardsSelectors } from '../../../core/selectors/cards.selectors';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { user } from '@angular/fire/auth';
import { UploadCardToStorageUseCase } from '../../../core/usecases/upload-card-to-storage.usecase';
import { StoreService } from '../../../core/services/store/store.service';
import { CardsActions } from '../../../core/actions/cards.actions';
import { GetCardUrlUseCase } from '../../../core/usecases/get-card-url.usecase';
import { PostUserCardUseCase } from '../../../core/usecases/post-user-card.usecase';

@Component({
  selector: 'album-add-new-card-window',
  templateUrl: './add-new-card-window.component.html',
  styleUrls: ['./add-new-card-window.component.scss']
})
export class AddNewCardWindowComponent extends Window implements OnInit, OnDestroy {
  @ViewChild('cardNameInput')
  cardNameInput!: ElementRef;

  @ViewChild('cardDescriptionInput')
  cardDescriptionInput!: ElementRef;

  @ViewChild('cardUploadInput')
  cardUploadInput!: ElementRef;

  @Input()
  declare config: AddNewCardWindowConfig | null;

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
    this.uploadCardSubscription.unsubscribe();
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
            url: url
          };
          return this.postUserCardUseCase.invoke(this.user.uid, card);
        }))
      .subscribe((data) => {
        this.config?.onWindowClosed();
        console.log(data);
      });
  }
}

export interface AddNewCardWindowConfig extends WindowConfig {}
