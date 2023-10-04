import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardWindowsComponent } from './card-windows.component';

const routes: Routes = [
  { path: '', component: CardWindowsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardWindowsRoutingModule { }
