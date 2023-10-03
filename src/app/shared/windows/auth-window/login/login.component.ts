import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUserData } from '../../../../core/models/api/auth-user-data.model';
import { User } from '../../../../core/models/user.model';
import { LoginUseCase } from '../../../../core/usecases/login.usecase';
import { UserSelectors } from '../../../../core/selectors/user.selectors';
import { UserActions } from '../../../../core/actions/user.actions';
import { AuthWindowActions } from '../../../../core/actions/auth-window.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'album-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  loginForm!: FormGroup;
  loginForm$!: Observable<any>;
  loginFormSub!: Subscription;
  loginFormValues!: AuthUserData;

  loginUseCaseSub!: Subscription

  user$!: Observable<User>;
  userSub!: Subscription;

  constructor(
    private store: Store,
    private loginUseCase: LoginUseCase,
    private formBuilder: FormBuilder,
    private routerService: Router
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
    this.loginForm$ = this.loginForm.valueChanges;
    this.loginFormSub = this.loginForm$.subscribe((form: AuthUserData) => {
      this.loginFormValues = {
        email: form.email,
        password: form.password
      };
    });
    this.user$ = store.select(UserSelectors.selectUserState);
  }

  submit() {
    console.log('login submit button event');
    this.loginUseCaseSub = this.loginUseCase.invoke({
      email: this.loginFormValues.email,
      password: this.loginFormValues.password
    }).subscribe((user) => {
      console.log('login login usecase');
      this.store.dispatch(UserActions.loginUser({
        uid: user.uid,
        email: user.email
      }));
      this.routerService.navigate(['/collage']);
      console.log('login store login user dispatch');
    });
  }

  ngAfterViewInit(): void {
    this.userSub = this.user$.subscribe((user) => {
      console.log('login', user);
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    if (this.loginUseCaseSub) {
      this.loginUseCaseSub.unsubscribe();
    }
  }

  onToRegistrationButtonClicked(): void {
    console.log('to reg button clicked');
    this.store.dispatch(AuthWindowActions.setRegisterAuthType());
    console.log('login set register auth type dispatch');
  }
}
