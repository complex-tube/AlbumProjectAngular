import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCardWindowComponent } from './view-card-window.component';

const routes: Routes = [{ path: '', component: ViewCardWindowComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewCardWindowRoutingModule { }
