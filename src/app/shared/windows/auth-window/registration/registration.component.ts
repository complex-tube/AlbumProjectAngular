import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { filter, Observable, Subscription, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUserData } from '../../../../core/models/api/auth-user-data.model';
import { User } from '../../../../core/models/user.model';
import { RegisterUseCase } from '../../../../core/usecases/register.usecase';
import { PostUserToStoreUseCase } from '../../../../core/usecases/post-user-to-store.usecase';
import { UserSelectors } from '../../../../core/selectors/user.selectors';
import { UserActions } from '../../../../core/actions/user.actions';
import { AuthWindowActions } from '../../../../core/actions/auth-window.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'album-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements AfterViewInit, OnDestroy {
  registrationForm!: FormGroup;
  registrationForm$!: Observable<any>;
  registrationFormSub!: Subscription;
  registrationFormValues!: AuthUserData;

  registerUseCaseSub!: Subscription;

  user$!: Observable<User>;
  userSub!: Subscription;
  userDataUploadSub!: Subscription;

  constructor(
    private store: Store,
    private registerUseCase: RegisterUseCase,
    private postUserToStore: PostUserToStoreUseCase,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registrationForm = formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      passwordAgain: ['', Validators.required]
    })

    this.registrationForm$ = this.registrationForm.valueChanges;
    this.registrationFormSub = this.registrationForm$.subscribe((form: AuthUserData) => {
      this.registrationFormValues = {
        email: form.email,
        password: form.password
      };
    });
    this.user$ = this.store.select(UserSelectors.selectUserState);
  }

  ngAfterViewInit(): void {
    this.userSub = this.user$.subscribe((user) => {
      console.log('registration', user);
    });
    this.userDataUploadSub = this.user$
      .pipe(
        filter((user) => user.uid != ''),
        switchMap((user) => {
          console.log('registration store service set user ');
          return this.postUserToStore.invoke(user);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.registrationFormSub.unsubscribe();
    this.userSub.unsubscribe();
    this.userDataUploadSub.unsubscribe();
    if (this.registerUseCaseSub) {
      this.registerUseCaseSub.unsubscribe();
    }
  }

  submitRegistration(): void {
    this.registerUseCaseSub = this.registerUseCase.invoke({
      email: this.registrationFormValues.email,
      password: this.registrationFormValues.password
    }).subscribe((user) => {
      console.log('registration register user dispatch');
      this.store.dispatch(UserActions.registerUser({uid: user.uid, email: user.email}));
    });
  }

  onToLoginButtonClicked(): void {
    console.log('registration set login auth type dispatch');
    this.store.dispatch(AuthWindowActions.setLoginAuthType());
    this.router.navigate(['/collage']);
  }
}
