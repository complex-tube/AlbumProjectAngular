import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { filter, fromEvent, map, mergeMap, Observable, Subscription, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthTypeActions } from '../../../core/actions/auth-type.actions';
import { LoginUseCase } from '../../../core/usecases/login.usecase';
import { UserActions } from '../../../core/actions/user.actions';
import { GetCardsUseCase } from '../../../core/usecases/get-cards.usecase';
import { CardsActions } from '../../../core/actions/cards.actions';
import { user } from '@angular/fire/auth';
import { UserSelectors } from '../../../core/selectors/user.selectors';
import { User } from '../../../core/models/user.model';

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

  user$!: Observable<User>;
  userSubscription!: Subscription;



  constructor(
    private store: Store,
    private loginUseCase: LoginUseCase,
  ) {
    this.user$ = store.select(UserSelectors.selectUserState);
  }

  ngAfterViewInit(): void {
    this.userSubscription = this.user$.subscribe((user) => {
      console.log('login', user);
    });
    this.subscribeOnToRegistrationButtonEvent();
    this.subscribeOnLoginButtonEvent();
  }

  ngOnDestroy(): void {
    this.toRegistrationButtonEventSubscription.unsubscribe();
    this.loginSubmitButtonEventSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  private subscribeOnLoginButtonEvent(): void {
    this.loginSubmitButtonEventSubscription = fromEvent(
      this.loginSubmitButton.nativeElement,
      'click'
    )
      .pipe(
        switchMap(() => {
          console.log('login submit button event');
          return this.loginUseCase.invoke({
            email: this.emailInput.nativeElement.value,
            password: this.passwordInput.nativeElement.value
          })
        })
      ).subscribe((user) => {
      console.log('login login usecase');
      this.store.dispatch(UserActions.loginUser({
        uid: user.uid,
        email: user.email
      }));
      console.log('login store login user dispatch');
    });
  }

  private subscribeOnToRegistrationButtonEvent(): void {
    this.toRegistrationButtonEventSubscription = fromEvent(
      this.toRegistrationButton.nativeElement,
      'click',
    ).subscribe(() => {
      console.log('to reg button clicked');
      this.store.dispatch(AuthTypeActions.setRegisterAuthType());
      console.log('login set register auth type dispatch');
    });
  }
}
