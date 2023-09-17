import { Component, Output } from '@angular/core';
import { LoginConfig } from '../../windows/auth-window/auth-window.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'album-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output()
  loginConfig!: LoginConfig | null;

  constructor(private store: Store) {}

  onLoginButtonClick(): void {
    this.loginConfig = {
      onWindowClosed: () => {
        this.loginConfig = null;
      },
    };
  }
}
