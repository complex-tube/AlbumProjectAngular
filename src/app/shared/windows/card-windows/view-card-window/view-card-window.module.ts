import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCardWindowRoutingModule } from './view-card-window-routing.module';
import { ViewCardWindowComponent } from './view-card-window.component';


@NgModule({
  declarations: [ViewCardWindowComponent],
  exports: [ViewCardWindowComponent],
  imports: [CommonModule, ViewCardWindowRoutingModule],
})
export class ViewCardWindowModule {}
