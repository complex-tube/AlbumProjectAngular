import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { AuthType } from '../../../core/services/authorization/authorization.service';
import { fromEvent, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { setLoginAuthType } from '../../../core/actions/auth.action';

@Component({
  selector: 'album-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements AfterViewInit, OnDestroy {
  @ViewChild('toLoginButton')
  toLoginButton!: ElementRef;

  toLoginButtonEventSubscription!: Subscription;

  constructor(private store: Store<{ authType: AuthType }>) {}

  ngAfterViewInit(): void {
    this.toLoginButtonEventSubscription = fromEvent(
      this.toLoginButton.nativeElement,
      'click',
    ).subscribe(() => {
      this.store.dispatch(setLoginAuthType());
    });
  }

  ngOnDestroy(): void {
    this.toLoginButtonEventSubscription.unsubscribe();
  }
}
