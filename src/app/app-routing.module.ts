import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']); // redirect to login page

// Define the routes
const routes: Routes = [
  {
    path: 's', // if the path is /s then use the private module to route and use the layout component
    component: LayoutComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    loadChildren: () =>
      // use the private module
      import('./private/private.module').then((m) => m.PrivateModule),
  },
  {
    path: '', // if the path is / then use the public module to route
    loadChildren: () =>
      // use the public module
      import('./public/public.module').then((m) => m.PublicModule),
  },
  {
    path: '**', // if the path is anything else then redirect to /s
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
