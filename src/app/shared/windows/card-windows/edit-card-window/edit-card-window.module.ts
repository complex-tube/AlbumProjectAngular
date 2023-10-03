import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditCardWindowRoutingModule } from './edit-card-window-routing.module';
import { EditCardWindowComponent } from './edit-card-window.component';


@NgModule({
  declarations: [EditCardWindowComponent],
  exports: [EditCardWindowComponent],
  imports: [CommonModule, EditCardWindowRoutingModule],
})
export class EditCardWindowModule {}
