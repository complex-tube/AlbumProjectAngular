import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, map, Subscription, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../core/actions/auth.actions';
import { RegisterUseCase } from '../../../core/usecases/register.usecase';
import { RegistrationActions } from '../../../core/actions/registration.actions';

@Component({
  selector: 'album-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements AfterViewInit, OnDestroy {
  @ViewChild('emailInput')
  emailInput!: ElementRef;

  @ViewChild('passwordInput')
  passwordInput!: ElementRef;

  @ViewChild('registrationSubmitButton')
  registrationSubmitButton!: ElementRef;

  @ViewChild('toLoginButton')
  toLoginButton!: ElementRef;

  registrationSubmitButtonEventSubscription!: Subscription;

  toLoginButtonEventSubscription!: Subscription;

  constructor(
    private store: Store,
    private registerUseCase: RegisterUseCase,
  ) {}

  ngAfterViewInit(): void {
    this.toLoginButtonEventSubscription = fromEvent(
      this.toLoginButton.nativeElement,
      'click',
    ).subscribe(() => {
      this.store.dispatch(AuthActions.setLoginAuthType());
    });

    this.registrationSubmitButtonEventSubscription = fromEvent(
      this.registrationSubmitButton.nativeElement,
      'click',
    )
      .pipe(
        switchMap(() => {
          return this.registerUseCase.invoke({
            email: this.emailInput.nativeElement.value,
            password: this.passwordInput.nativeElement.value,
          });
        }),
        map((userCredential) => userCredential.user),
      )
      .subscribe((user) => {
        if (user) {
          this.store.dispatch(RegistrationActions.registerUser({ uid: user.uid }));
        }
      });
  }

  ngOnDestroy(): void {
    this.toLoginButtonEventSubscription.unsubscribe();
    this.registrationSubmitButtonEventSubscription.unsubscribe();
  }
}
