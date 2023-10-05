import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardWindowsRoutingModule } from './card-windows-routing.module';
import { CardWindowsComponent } from './card-windows.component';


@NgModule({
  declarations: [
    CardWindowsComponent
  ],
  imports: [
    CommonModule,
    CardWindowsRoutingModule
  ]
})
export class CardWindowsModule { }
