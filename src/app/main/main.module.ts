import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CardsListComponent } from './cards-list/cards-list.component';
import { CardItemComponent } from './cards-list/card-item/card-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CardsListComponent, CardItemComponent],
  exports: [CardsListComponent],
  imports: [CommonModule, NgOptimizedImage, SharedModule],
})
export class MainModule {}
