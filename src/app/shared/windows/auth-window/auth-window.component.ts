import {Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Window, WindowConfig} from "../../../core/base/window";
import {AuthorizationService, AuthType} from "../../../core/services/authorization/authorization.service";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;
import {Subscription} from "rxjs";

@Component({
  selector: 'album-auth-window',
  templateUrl: './auth-window.component.html',
  styleUrls: ['./auth-window.component.scss']
})
export class AuthWindowComponent extends Window implements OnInit, OnDestroy {

  @Input()
  override config!: LoginConfig;

  @ViewChild("emailInput")
  loginValueInput!: ElementRef;

  @ViewChild("loginPasswordInput")
  loginPasswordInput!: ElementRef;

  @ViewChild("registrationEmailInput")
  registrationLoginValueInput!: ElementRef;

  @ViewChild("registrationPasswordInput")
  registrationPasswordInput!: ElementRef;

  @ViewChild("registrationPasswordRepeatInput")
  registrationPasswordRepeatInput!: ElementRef;

  currentAuthType: AuthType = AuthType.LOGIN;

  authTypeChangeSubjectSubscription!: Subscription;

  readonly AuthType = AuthType;

  constructor(protected override renderer: Renderer2, private authService: AuthorizationService) {
    super(renderer)
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.authTypeChangeSubjectSubscription = this.authService.authTypeSubject.subscribe((authType) => {
      this.currentAuthType = authType;
      console.log(this.authService.authTypeSubject, this.currentAuthType);
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.authTypeChangeSubjectSubscription.unsubscribe();
  }

  signInUser(): void {
    this.authService.signInUser(
      this.loginValueInput.nativeElement.value,
      this.loginPasswordInput.nativeElement.value
    ).subscribe({
      next(response: UserCredential) {
        console.log(response.user);
      },
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('Completed');
      }
    });
  }

  registerUser(): void {
    this.authService.registerUser(
      this.registrationLoginValueInput.nativeElement.value,
      this.registrationPasswordInput.nativeElement.value
    ).subscribe({
      next(response) {
      console.log(response);
      },
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('Completed');
      }
    });
  }

  changeAuthType(): void {
    this.currentAuthType = this.currentAuthType == AuthType.LOGIN ? AuthType.REGISTRATION : AuthType.LOGIN;
  }
}

export interface LoginConfig extends WindowConfig {

}
