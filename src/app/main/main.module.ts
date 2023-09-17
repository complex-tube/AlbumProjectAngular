import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsListComponent } from './cards-list/cards-list.component';
import { CardItemComponent } from './cards-list/card-item/card-item.component';

@NgModule({
  declarations: [CardsListComponent, CardItemComponent],
  exports: [CardsListComponent],
  imports: [CommonModule],
})
export class MainModule {}
