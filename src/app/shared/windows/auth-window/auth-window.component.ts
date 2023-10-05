import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Window } from '../../../core/base/window';
import {
  AuthType,
} from '../../../core/services/authorization/authorization.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthWindowSelectors } from '../../../core/selectors/auth-window.selectors';
import { AuthWindowActions } from '../../../core/actions/auth-window.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'album-auth-window',
  templateUrl: './auth-window.component.html',
  styleUrls: ['./auth-window.component.scss'],
})
export class AuthWindowComponent extends Window implements OnInit, OnDestroy {

  authWindowType$!: Observable<AuthType>;

  constructor(
    protected override renderer: Renderer2,
    private store: Store,
    private router: Router
  ) {
    super(renderer);
    this.authWindowType$ = this.store.select(AuthWindowSelectors.selectAuthWindowType);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.router.navigate(['/auth/login']);
    // this.router.navigateByUrl("/auth(auth-window:login;open=true)");
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  closeWindow() {
    this.store.dispatch(AuthWindowActions.closeWindow());
  }
}
