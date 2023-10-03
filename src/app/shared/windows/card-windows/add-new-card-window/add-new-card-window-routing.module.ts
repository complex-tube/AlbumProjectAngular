import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewCardWindowComponent } from './add-new-card-window.component';

const routes: Routes = [{ path: '', component: AddNewCardWindowComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddNewCardWindowRoutingModule { }
