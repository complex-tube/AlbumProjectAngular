import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthorizationService, AuthType} from "../../../core/services/authorization/authorization.service";
import {fromEvent, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {setLoginAuthType} from "../../../core/actions/auth.action";

@Component({
  selector: 'album-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('toLoginButton')
  toLoginButton!: ElementRef;

  toLoginButtonEventSubscription!: Subscription;

  constructor(private authService: AuthorizationService, private store: Store<{authType: AuthType}>) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.toLoginButtonEventSubscription = fromEvent(this.toLoginButton.nativeElement, 'click').subscribe(() => {
      this.store.dispatch(setLoginAuthType());
    });
  }

  ngOnDestroy(): void {
    this.toLoginButtonEventSubscription.unsubscribe();
  }

}
