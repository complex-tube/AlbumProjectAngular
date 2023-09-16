import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthWindowComponent } from './windows/auth-window/auth-window.component';
import { LoginComponent } from './layout/login/login.component';
import { RegistrationComponent } from './layout/registration/registration.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AuthWindowComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  exports: [HeaderComponent, FooterComponent, AuthWindowComponent],
  imports: [CommonModule],
})
export class SharedModule {}
