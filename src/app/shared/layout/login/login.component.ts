import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthorizationService, AuthType} from "../../../core/services/authorization/authorization.service";
import {fromEvent, Subscription} from "rxjs";

@Component({
  selector: 'album-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('toRegistrationButton')
  toRegistrationButton!: ElementRef;

  toRegistrationButtonEventSubscription!: Subscription;

  constructor(private authService: AuthorizationService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.toRegistrationButtonEventSubscription = fromEvent(this.toRegistrationButton.nativeElement, 'click').subscribe(() => {
      this.authService.authTypeSubject.next(AuthType.REGISTRATION);
    });
  }

  ngOnDestroy(): void {
    this.toRegistrationButtonEventSubscription.unsubscribe();
  }

}
