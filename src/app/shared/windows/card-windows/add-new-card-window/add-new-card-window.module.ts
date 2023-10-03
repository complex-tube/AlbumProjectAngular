import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNewCardWindowRoutingModule } from './add-new-card-window-routing.module';
import { AddNewCardWindowComponent } from './add-new-card-window.component';


@NgModule({
  declarations: [AddNewCardWindowComponent],
  exports: [AddNewCardWindowComponent],
  imports: [CommonModule, AddNewCardWindowRoutingModule],
})
export class AddNewCardWindowModule {}
