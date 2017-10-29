import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LocationButtonComponent } from './components/location-button/location-button.component';

import { GpsService } from './services/gps.service';

import { HomeComponent } from './pages/home/home.component';
import { GpsComponent } from './pages/gps/gps.component';

const appRoutes: Routes = [
    { path: 'gps', component: GpsComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LocationButtonComponent,
    HomeComponent,
    GpsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
      GpsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
