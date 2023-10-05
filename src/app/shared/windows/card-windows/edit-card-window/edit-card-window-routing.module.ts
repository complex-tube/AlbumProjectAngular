import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCardWindowComponent } from './edit-card-window.component';

const routes: Routes = [{ path: '', component: EditCardWindowComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditCardWindowRoutingModule { }
