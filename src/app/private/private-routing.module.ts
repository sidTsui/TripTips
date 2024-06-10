import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExplorePageComponent } from './components/explore-page/explore-page.component';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-components/user-profile/user-profile.component';
import { UsersDashboardComponent } from './components/user-components/users-dashboard/users-dashboard.component';

// Define the routes for the private module
const routes: Routes = [
  {
    path: '', // if the path is / then redirect to home component
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'explore',
    component: ExplorePageComponent,
  },
  {
    path: 'followers',
    component: UsersDashboardComponent,
  },
  {
    path: 'followers/:id',
    component: UsersDashboardComponent,
  },
  {
    path: 'profile',
    component: UserProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
