import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClimateComponent } from './views/climate/climate.component';
import { HomeComponent } from './views/home/home.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';

const MaterialModules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatDividerModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatProgressSpinnerModule
]

@NgModule({
  declarations: [
    AppComponent,
    ClimateComponent,
    HomeComponent,
    DashboardComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ... MaterialModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
