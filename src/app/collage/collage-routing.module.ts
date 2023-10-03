import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollageComponent } from './collage.component';

const routes: Routes = [
  { path: '', component: CollageComponent },
  { path: 'card/:id', loadChildren: () => import('../shared/windows/card-windows/card-windows.module').then(m => m.CardWindowsModule) },
  { path: 'card/add', loadChildren: () => import('../shared/windows/card-windows/add-new-card-window/add-new-card-window.module').then(m => m.AddNewCardWindowModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollageRoutingModule { }
