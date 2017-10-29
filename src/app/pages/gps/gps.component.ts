import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AgmCoreModule } from '@agm/core';

import { GpsService } from '../../services/gps.service';

import { Coordinates } from '../../models/coordinates';
import { Position } from '../../models/position';

@Component({
    selector: 'app-gps',
    templateUrl: './gps.component.html',
    styleUrls: ['./gps.component.scss']
})
export class GpsComponent implements OnInit, OnDestroy {


    // GPS vars
    userGPS: Position = new Position;
    gpsSubscription: Subscription;


    lat: number = 51.678418;
    lng: number = 7.809007;

    constructor(
        private gpsService: GpsService
    ) { }


    ngOnInit() {
        console.log("Init location-button.component");

        // Subscribe GPS postion from navigator
        this.gpsSubscription = this.gpsService.getLocation().subscribe( (userGPS) => {
            this.userGPS = userGPS;
            console.log("GPS GET: ", this.userGPS);
        });
    }


    ngOnDestroy() {
        this.gpsSubscription.unsubscribe();
    }

}
