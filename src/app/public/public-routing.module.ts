import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginAndSignupComponent } from './components/login-and-signup/login-and-signup.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

// Define the routes for the public module
const routes: Routes = [
  {
    path: 'auth', // if the path is /auth then use the login and signup component
    component: LoginAndSignupComponent,
  },
  {
    path: 'reset-password', // if the path is /reset-password then use the reset password component
    component: ResetPasswordComponent,
  },
  {
    path: '**', // if the path is anything else then redirect to /auth
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
