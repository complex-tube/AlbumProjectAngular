import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthorizationService, AuthType} from "../../../core/services/authorization/authorization.service";
import {fromEvent, Subscription} from "rxjs";

@Component({
  selector: 'album-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('toLoginButton')
  toLoginButton!: ElementRef;

  toLoginButtonEventSubscription!: Subscription;

  constructor(private authService: AuthorizationService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.toLoginButtonEventSubscription = fromEvent(this.toLoginButton.nativeElement, 'click').subscribe(() => {
      this.authService.authTypeSubject.next(AuthType.LOGIN);
    });
  }

  ngOnDestroy(): void {
    this.toLoginButtonEventSubscription.unsubscribe();
  }

}
