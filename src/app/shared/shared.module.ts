import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {HeaderComponent} from "./layout/header/header.component";
import {FooterComponent} from "./layout/footer/footer.component";
import { LoginWindowComponent } from './windows/login-window/login-window.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginWindowComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
