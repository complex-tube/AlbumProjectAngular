import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthWindowComponent } from './windows/auth-window/auth-window.component';
import { LoginComponent } from './layout/login/login.component';
import { RegistrationComponent } from './layout/registration/registration.component';
import { AddNewCardWindowComponent } from './windows/add-new-card-window/add-new-card-window.component';
import { EditCardWindowComponent } from './windows/edit-card-window/edit-card-window.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AuthWindowComponent,
    LoginComponent,
    RegistrationComponent,
    AddNewCardWindowComponent,
    EditCardWindowComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AuthWindowComponent,
    AddNewCardWindowComponent,
    EditCardWindowComponent,
  ],
  imports: [CommonModule],
})
export class SharedModule {}
