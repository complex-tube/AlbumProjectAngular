import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollageComponent } from './collage.component';

const routes: Routes = [
  { path: '', component: CollageComponent, children: [
      { path: 'card/add', loadChildren: () => import('../shared/windows/card-windows/add-new-card-window/add-new-card-window.module').then(m => m.AddNewCardWindowModule)},
      { path: 'card/:id/edit', loadChildren: () => import('../shared/windows/card-windows/edit-card-window/edit-card-window.module').then(m => m.EditCardWindowModule) },
      { path: 'card/:id/view', loadChildren: () => import('../shared/windows/card-windows/view-card-window/view-card-window.module').then(m => m.ViewCardWindowModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollageRoutingModule { }
