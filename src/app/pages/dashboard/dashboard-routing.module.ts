import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { CarDetailsComponent } from '../car-details/car-details.component';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }, 
  {
    path: 'car-details/:id',
    component: CarDetailsComponent
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
