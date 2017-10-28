import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LocationButtonComponent } from './components/location-button/location-button.component';

import { GpsService } from './services/gps.service';

@NgModule({
  declarations: [
    AppComponent,
    LocationButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
      GpsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
