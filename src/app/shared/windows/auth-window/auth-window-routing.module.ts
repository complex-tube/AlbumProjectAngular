import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthWindowComponent } from './auth-window.component';

const routes: Routes = [
  { path: '', component: AuthWindowComponent, children: [
      {
        path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'registration', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule)
      }
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthWindowRoutingModule { }
