import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { GpsService } from '../../services/gps.service';

import { Coordinates } from '../../models/coordinates';
import { Position } from '../../models/position';

@Component({
    selector: 'location-button',
    templateUrl: './location-button.component.html',
    styleUrls: ['./location-button.component.scss']
})
export class LocationButtonComponent implements OnInit, OnDestroy {

    // GET
    userGPS: Position = new Position;
    gpsSubscription: Subscription;

    // // WATCH
    // watchUserGPS: Position = new Position;
    // watchGpsSubscription: Subscription;



    constructor(
        private gpsService: GpsService
    ) { }

    ngOnInit() {
        console.log("Init location-button.component");


        // GET
        this.gpsSubscription = this.gpsService.getLocation().subscribe( (userGPS) => {
            this.userGPS = userGPS;
            console.log("GPS GET: ", this.userGPS);
        });

        //
        // // WATCH
        // this.watchGpsSubscription = this.gpsService.watchLocation().subscribe( (watchUserGPS) => {
        //     this.watchUserGPS = watchUserGPS;
        //     console.log("GPS WATCH: ", this.watchUserGPS);
        // });
    }

    loctionBtnClick() {
        console.log("locationBtnClicked()");
        console.log(this.userGPS);
        //console.log(this.watchUserGPS);
    }

    ngOnDestroy() {
        this.gpsSubscription.unsubscribe();
        //this.watchGpsSubscription.unsubscribe();
    }

}
