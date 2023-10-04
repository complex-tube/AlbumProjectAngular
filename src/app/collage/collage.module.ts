import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollageRoutingModule } from './collage-routing.module';
import { CollageComponent } from './collage.component';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [CollageComponent, CardComponent],
  exports: [CardComponent],
  imports: [CommonModule, CollageRoutingModule],
})
export class CollageModule {}
