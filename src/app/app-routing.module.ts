import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule)},
  { path: 'auth', loadChildren: () => import('./shared/windows/auth-window/auth-window.module').then(m => m.AuthWindowModule) },
  { path: 'collage', loadChildren: () => import('./collage/collage.module').then(m => m.CollageModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
