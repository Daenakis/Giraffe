import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdsComponent } from './ads/ads.component';
import { AdDetailComponent } from './ad-detail/ad-detail.component';
import { AdAddComponent } from './ad-add/ad-add.component';
import { AdEditComponent } from './ad-edit/ad-edit.component';

const routes: Routes = [
  {
    path: 'ads',
    component: AdsComponent,
    data: { title: 'List of Ads' }
  },
  {
    path: 'ad-details/:id',
    component: AdDetailComponent,
    data: { title: 'Ad Details' }
  },
  {
    path: 'ad-add',
    component: AdAddComponent,
    data: { title: 'Add Ad' }
  },
  {
    path: 'ad-edit/:id',
    component: AdEditComponent,
    data: { title: 'Edit Ad' }
  },
  {
    path: '',
    redirectTo: '/ads',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
