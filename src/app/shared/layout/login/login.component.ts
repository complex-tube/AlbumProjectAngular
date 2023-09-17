import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { filter, fromEvent, map, Subscription, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../core/actions/auth.actions';
import { LoginActions } from '../../../core/actions/login.actions';
import { LoginUseCase } from '../../../core/usecases/login.usecase';

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

  constructor(
    private store: Store,
    private loginUseCase: LoginUseCase,
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
          return this.loginUseCase.invoke({
            email: this.emailInput.nativeElement.value,
            password: this.passwordInput.nativeElement.value,
          });
        }),
        filter((userCredentials) => userCredentials != null),
        map((userCredentials) => userCredentials.user),
      )
      .subscribe((user) => {
        if (user != null) {
          this.store.dispatch(LoginActions.setUserCredentialsByLogin({ uid: user.uid }));
        }
      });
  }

  private subscribeOnToRegistrationButtonEvent(): void {
    this.toRegistrationButtonEventSubscription = fromEvent(
      this.toRegistrationButton.nativeElement,
      'click',
    ).subscribe(() => {
      this.store.dispatch(AuthActions.setRegisterAuthType());
    });
  }
}
