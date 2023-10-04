import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNewCardWindowRoutingModule } from './add-new-card-window-routing.module';
import { AddNewCardWindowComponent } from './add-new-card-window.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddNewCardWindowComponent],
  exports: [AddNewCardWindowComponent],
  imports: [
    CommonModule,
    AddNewCardWindowRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class AddNewCardWindowModule {}
