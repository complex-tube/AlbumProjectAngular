import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Window, WindowConfig } from '../../../core/base/window';
import {
  AuthorizationService,
  AuthType,
} from '../../../core/services/authorization/authorization.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'album-auth-window',
  templateUrl: './auth-window.component.html',
  styleUrls: ['./auth-window.component.scss'],
})
export class AuthWindowComponent extends Window implements OnInit, OnDestroy {
  @Input()
  override config: LoginConfig = new class implements LoginConfig {
    onSuccess() {
    }

    onWindowClosed() {
    }
  };

  readonly AuthType = AuthType;

  constructor(
    protected override renderer: Renderer2,
    private authService: AuthorizationService,
  ) {
    super(renderer);
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

export interface LoginConfig extends WindowConfig {}
