import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { filter, fromEvent, map, Subscription, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthTypeActions } from '../../../core/actions/auth-type.actions';
import { RegisterUseCase } from '../../../core/usecases/register.usecase';
import { UserActions } from '../../../core/actions/user.actions';
import { StoreService } from '../../../core/services/store/store.service';
import { UserSelectors } from '../../../core/selectors/user.selectors';

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
    private storeService: StoreService
  ) {}

  ngAfterViewInit(): void {
    this.toLoginButtonEventSubscription = fromEvent(
      this.toLoginButton.nativeElement,
      'click',
    ).pipe(
      tap(() => {
        this.store.dispatch(AuthTypeActions.setLoginAuthType());
      })
    ).subscribe();

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
        filter((user) => user.uid != ''),
        tap((user) => {
          this.store.dispatch(UserActions.registerUser({uid: user.uid, email: user.email}));
        }),
        switchMap(() => {
          return this.store.select(UserSelectors.selectUserState);
        }),
        tap((user) => {
          console.log(user);
          this.storeService.setUser(user.uid, {
            uid: user.uid,
            email: user.email
          }, () => {});
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.toLoginButtonEventSubscription.unsubscribe();
    this.registrationSubmitButtonEventSubscription.unsubscribe();
  }
}
