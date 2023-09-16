import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {
  AuthorizationService,
  AuthType,
} from '../../../core/services/authorization/authorization.service';
import { catchError, filter, fromEvent, map, Observable, of, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../core/actions/auth.action';
import firebase from 'firebase/compat';
import UserCredential = firebase.auth.UserCredential;
import { LoginActions } from '../../../core/actions/login.action';

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
    private store: Store<{ authType: AuthType }>,
    private authService: AuthorizationService,
  ) {}

  ngAfterViewInit(): void {
    this.toRegistrationButtonEventSubscription = fromEvent(
      this.toRegistrationButton.nativeElement,
      'click',
    ).subscribe(() => {
      this.store.dispatch(AuthActions.setRegisterAuthType());
    });
    this.loginSubmitButtonEventSubscription = fromEvent(
      this.loginSubmitButton.nativeElement,
      'click',
    ).subscribe(() => {
      const loginObservable: Observable<UserCredential | null> =
        this.authService.getSignInObservable(
          this.emailInput.nativeElement.value,
          this.passwordInput.nativeElement.value,
        );
      loginObservable
        .pipe(
          catchError(() => of(null)),
          filter((userCredentials) => userCredentials != null),
          map((userCredentials) => userCredentials!.user),
        )
        .subscribe((user) => {
          if (user != null) {
            this.store.dispatch(LoginActions.setUserCredentialsByLogin({ uid: user.uid }));
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.toRegistrationButtonEventSubscription.unsubscribe();
  }
}
