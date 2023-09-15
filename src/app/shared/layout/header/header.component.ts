import {Component, OnInit, Output} from '@angular/core';
import {LoginConfig} from "../../windows/auth-window/auth-window.component";
import {AuthorizationService} from "../../../core/services/authorization/authorization.service";

@Component({
  selector: 'album-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output()
  loginConfig!: LoginConfig | null;

  constructor() { }

  ngOnInit(): void {
  }

  onLoginButtonClick(): void {
    this.loginConfig = {
      onWindowClosed: () => {
        this.loginConfig = null;
      }
    }
  }
}
