import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardWindowsComponent } from './card-windows.component';

const routes: Routes = [
  { path: '', component: CardWindowsComponent },
  { path: 'card/:id/edit', loadChildren: () => import('./edit-card-window/edit-card-window.module').then(m => m.EditCardWindowModule) },
  { path: 'card/:id/view', loadChildren: () => import('./view-card-window/view-card-window.module').then(m => m.ViewCardWindowModule) },
  { path: 'card/add', loadChildren: () => import('./add-new-card-window/add-new-card-window.module').then(m => m.AddNewCardWindowModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardWindowsRoutingModule { }
