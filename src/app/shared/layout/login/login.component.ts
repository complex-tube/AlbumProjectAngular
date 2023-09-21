import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { filter, fromEvent, map, mergeMap, Subscription, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthTypeActions } from '../../../core/actions/auth-type.actions';
import { LoginUseCase } from '../../../core/usecases/login.usecase';
import { UserActions } from '../../../core/actions/user.actions';
import { GetCardsUseCase } from '../../../core/usecases/get-cards.usecase';
import { CardsActions } from '../../../core/actions/cards.actions';
import { user } from '@angular/fire/auth';
import { UserSelectors } from '../../../core/selectors/user.selectors';

@Component({
  selector: 'album-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  @ViewChild('toRegistrationButton')
  toRegistrationButton!: ElementRef;

  @ViewChild('loginSubmitButton')
  loginSubmitButton!: ElementRef;

  @ViewChild('emailInput')
  emailInput!: ElementRef;

  @ViewChild('passwordInput')
  passwordInput!: ElementRef;

  toRegistrationButtonEventSubscription!: Subscription;

  loginSubmitButtonEventSubscription!: Subscription;

  getCardsSubscription!: Subscription;

  constructor(
    private store: Store,
    private loginUseCase: LoginUseCase,
    private getCardsUseCase: GetCardsUseCase,
  ) {}

  ngAfterViewInit(): void {
    this.subscribeOnToRegistrationButtonEvent();
    this.subscribeOnLoginButtonEvent();
  }

  ngOnDestroy(): void {
    this.toRegistrationButtonEventSubscription.unsubscribe();
    this.loginSubmitButtonEventSubscription.unsubscribe();
  }

  private subscribeOnLoginButtonEvent(): void {
    this.loginSubmitButtonEventSubscription = fromEvent(
      this.loginSubmitButton.nativeElement,
      'click',
    )
      .pipe(
        switchMap(() => {
          console.log('login login use case')
          return this.loginUseCase.invoke({
            email: this.emailInput.nativeElement.value,
            password: this.passwordInput.nativeElement.value,
          });
        })
      )
      .subscribe((user) => {
        this.store.dispatch(UserActions.loginUser({
          uid: user.uid,
          email: user.email
        }));
      });
  }

  private subscribeOnToRegistrationButtonEvent(): void {
    this.toRegistrationButtonEventSubscription = fromEvent(
      this.toRegistrationButton.nativeElement,
      'click',
    ).pipe(
      tap(() => {
        console.log('login set register auth type')
        this.store.dispatch(AuthTypeActions.setRegisterAuthType());
      })
    ).subscribe();
  }
}
