import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthWindowComponent } from './windows/auth-window/auth-window.component';
import { LoginComponent } from './layout/login/login.component';
import { RegistrationComponent } from './layout/registration/registration.component';
import { AddNewCardWindowComponent } from './windows/add-new-card-window/add-new-card-window.component';
import { EditCardWindowComponent } from './windows/edit-card-window/edit-card-window.component';
import { ViewCardWindowComponent } from './windows/view-card-window/view-card-window.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AuthWindowComponent,
    LoginComponent,
    RegistrationComponent,
    AddNewCardWindowComponent,
    EditCardWindowComponent,
    ViewCardWindowComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AuthWindowComponent,
    AddNewCardWindowComponent,
    EditCardWindowComponent,
    ViewCardWindowComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class SharedModule {}
