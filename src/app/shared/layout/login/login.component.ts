import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthorizationService, AuthType} from "../../../core/services/authorization/authorization.service";
import {fromEvent, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {setLoginAuthType, setRegisterAuthType} from "../../../core/actions/auth.action";

@Component({
  selector: 'album-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('toRegistrationButton')
  toRegistrationButton!: ElementRef;

  toRegistrationButtonEventSubscription!: Subscription;

  constructor(private authService: AuthorizationService,
              private store: Store<{authType: AuthType}>) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.toRegistrationButtonEventSubscription = fromEvent(this.toRegistrationButton.nativeElement, 'click').subscribe(() => {
      this.store.dispatch(setRegisterAuthType());
    });
  }

  ngOnDestroy(): void {
    this.toRegistrationButtonEventSubscription.unsubscribe();
  }

}
