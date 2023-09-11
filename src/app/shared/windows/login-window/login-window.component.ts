import {Component, Input, OnInit, Renderer2} from '@angular/core';
import {Window, WindowConfig} from "../../../core/base/window";

@Component({
  selector: 'album-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.scss']
})
export class LoginWindowComponent extends Window implements OnInit {

  @Input()
  override config!: LoginConfig;

  constructor(protected override renderer: Renderer2) {
    super(renderer)
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
}

export interface LoginConfig extends WindowConfig {

}
