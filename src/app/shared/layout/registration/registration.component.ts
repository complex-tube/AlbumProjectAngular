import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { filter, fromEvent, map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthTypeActions } from '../../../core/actions/auth-type.actions';
import { RegisterUseCase } from '../../../core/usecases/register.usecase';
import { UserActions } from '../../../core/actions/user.actions';
import { StoreService } from '../../../core/services/store/store.service';
import { UserSelectors } from '../../../core/selectors/user.selectors';
import { User } from '../../../core/models/user.model';

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

  user$!: Observable<User>;
  userSubscription!: Subscription;
  userDataUploadSubscription!: Subscription;

  constructor(
    private store: Store,
    private registerUseCase: RegisterUseCase,
    private storeService: StoreService
  ) {
    this.user$ = this.store.select(UserSelectors.selectUserState);
  }

  ngAfterViewInit(): void {
    this.userSubscription = this.user$.subscribe((user) => {
      console.log('registration', user);
    });
    this.toLoginButtonEventSubscription = fromEvent(
      this.toLoginButton.nativeElement,
      'click',
    ).subscribe(() => {
      console.log('registration set login auth type dispatch');
      this.store.dispatch(AuthTypeActions.setLoginAuthType());
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
        filter((user) => user.uid != '')
      )
      .subscribe((user) => {
        console.log('registration register user dispatch');
        this.store.dispatch(UserActions.registerUser({uid: user.uid, email: user.email}));
      });
    this.userDataUploadSubscription = this.user$.pipe(filter((user) => user.uid != '')).subscribe((user) => {
      this.storeService.setUser(user.uid, user, () => {});
    });
  }

  ngOnDestroy(): void {
    this.toLoginButtonEventSubscription.unsubscribe();
    this.registrationSubmitButtonEventSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.userDataUploadSubscription.unsubscribe();
  }
}
