import {Component, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Window, WindowConfig} from "../../../core/base/window";
import {AuthorizationService, AuthType} from "../../../core/services/authorization/authorization.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";

@Component({
  selector: 'album-auth-window',
  templateUrl: './auth-window.component.html',
  styleUrls: ['./auth-window.component.scss']
})
export class AuthWindowComponent extends Window implements OnInit, OnDestroy {

  @Input()
  override config!: LoginConfig;

  readonly AuthType = AuthType;

  constructor(protected override renderer: Renderer2,
              private authService: AuthorizationService,
              private store: Store<{authType: AuthType}>) {
    super(renderer);
    this.authService.currentAuthType$ = this.store.select('authType');
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  getCurrentAuthType(): Observable<AuthType> {
    return this.authService.currentAuthType$;
  }
}

export interface LoginConfig extends WindowConfig {

}
