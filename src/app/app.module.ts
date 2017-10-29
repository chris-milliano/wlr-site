import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { LocationButtonComponent } from './components/location-button/location-button.component';

import { environment } from '../environments/environment';

import { GpsService } from './services/gps.service';

import { HomeComponent } from './pages/home/home.component';
import { GpsComponent } from './pages/gps/gps.component';


const appRoutes: Routes = [
    { path: 'gps', component: GpsComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];

const googleMapsCore = AgmCoreModule.forRoot({
  apiKey : environment.GMAP_KEY,
});


@NgModule({
  declarations: [
    AppComponent,
    LocationButtonComponent,
    HomeComponent,
    GpsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    googleMapsCore
  ],
  providers: [
      GpsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
