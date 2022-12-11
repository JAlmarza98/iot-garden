import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClimateComponent } from './views/climate/climate.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

import { HomeComponent } from './views/home/home.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'climate', component: ClimateComponent},
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
