import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthWindowRoutingModule } from './auth-window-routing.module';
import { AuthWindowComponent } from './auth-window.component';


@NgModule({
  declarations: [AuthWindowComponent],
  exports: [AuthWindowComponent],
  imports: [CommonModule, AuthWindowRoutingModule],
})
export class AuthWindowModule {}
