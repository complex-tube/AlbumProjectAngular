import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { AuthType } from '../../../core/services/authorization/authorization.service';
import { fromEvent, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { setRegisterAuthType } from '../../../core/actions/auth.action';

@Component({
  selector: 'album-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  @ViewChild('toRegistrationButton')
  toRegistrationButton!: ElementRef;

  toRegistrationButtonEventSubscription!: Subscription;

  constructor(private store: Store<{ authType: AuthType }>) {}

  ngAfterViewInit(): void {
    this.toRegistrationButtonEventSubscription = fromEvent(
      this.toRegistrationButton.nativeElement,
      'click',
    ).subscribe(() => {
      this.store.dispatch(setRegisterAuthType());
    });
  }

  ngOnDestroy(): void {
    this.toRegistrationButtonEventSubscription.unsubscribe();
  }
}
