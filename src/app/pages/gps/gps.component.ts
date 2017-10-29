import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AgmCoreModule } from '@agm/core';

import { GpsService } from '../../services/gps.service';

import { Coordinates } from '../../models/coordinates';
import { Position } from '../../models/position';

declare var google: any;

export class marker {
    lat: number;
    lng: number;
    title: string;
    radius: number;
}

@Component({
    selector: 'app-gps',
    templateUrl: './gps.component.html',
    styleUrls: ['./gps.component.scss']
})
export class GpsComponent implements OnInit, OnDestroy {


    // GPS vars
    userGPS: Position = new Position;
    gpsSubscription: Subscription;

    markers: marker[] = [
        { lat: 38.60834, lng: -90.24080, title: 'Starbucks', radius: 20},
        { lat: 38.61052, lng: -90.24927, title: 'Our House', radius: 20}
    ];


    // Hold an array of markers the user has been to
    visitedMarkers: marker[] = [];


    constructor(
        private gpsService: GpsService
    ) { }


    ngOnInit() {
        console.log("Init location-button.component");

        // Subscribe GPS postion from navigator
        this.gpsSubscription = this.gpsService.getLocation().subscribe( (userGPS) => {
            this.userGPS = userGPS;
            console.log("GPS GET: ", this.userGPS);
            this.checkMarkerDistances();
        });
    }


    checkMarkerDistances() {
        console.log("Check marker distance");

        let myLatLng = new google.maps.LatLng({lat:this.userGPS.coords.latitude, lng:this.userGPS.coords.longitude});

        for (let marker of this.markers) {

            let markerLatLng = new google.maps.LatLng({lat:marker.lat, lng:marker.lng});

            let dist = google.maps.geometry.spherical.computeDistanceBetween( myLatLng, markerLatLng );
            if (dist < marker.radius) {
                this.visitedMarkers.push(marker);
                console.log("add",this.visitedMarkers);
            }

            console.log("Marker:", marker, dist);
        }

        //
        if (this.visitedMarkers) {
            console.log("Add visitedMarkers to local storage");
        }

        else { console.log("NO NEARBY MARKERS"); }
    }


    ngOnDestroy() {
        this.gpsSubscription.unsubscribe();
    }

}
