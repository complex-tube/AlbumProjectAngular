import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollageRoutingModule } from './collage-routing.module';
import { CollageComponent } from './collage.component';
import { CardComponent } from './card/card.component';
import { AddNewCardWindowModule } from '../shared/windows/card-windows/add-new-card-window/add-new-card-window.module';


@NgModule({
  declarations: [CollageComponent, CardComponent],
  exports: [CollageComponent],
  imports: [CommonModule, CollageRoutingModule, AddNewCardWindowModule],
})
export class CollageModule {}
