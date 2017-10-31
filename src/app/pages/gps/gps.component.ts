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
    label: string;
    visited: boolean;
}

@Component({
    selector: 'app-gps',
    templateUrl: './gps.component.html',
    styleUrls: ['./gps.component.scss']
})
export class GpsComponent implements OnInit, OnDestroy {

    markerInLocalStorage: any;


    // GPS vars
    userGPS: Position = new Position;
    gpsSubscription: Subscription;

    markers: marker[] = [
        { lat: 38.60834, lng: -90.24080, title: "Starbucks", radius: 20, label: "A", visited: false },
        { lat: 38.61052, lng: -90.24927, title: "Our House", radius: 20, label: "B", visited: false }
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


        //
        this.getLocalStorage();
    }


    // Fxn iterates over
    checkMarkerDistances() {
        console.log("Check marker distance");

        // Set the user's Google LatLng Obj
        let myLatLng = new google.maps.LatLng({lat:this.userGPS.coords.latitude, lng:this.userGPS.coords.longitude});

        // Iterate over all markers
        for (let marker of this.markers) {

            // Set this marker's Google LatLng Obj
            let markerLatLng = new google.maps.LatLng({lat:marker.lat, lng:marker.lng});

            // Find the distance between the user and this marker
            let dist = google.maps.geometry.spherical.computeDistanceBetween( myLatLng, markerLatLng );

            // If the distance is under the marker defined radius that add it to
            // an array of vistied markers to handle after this check
            if ( (dist < marker.radius)  && !(marker.visited) ) {
                this.visitedMarkers.push(marker);
                console.log("add",this.visitedMarkers);
            }

            console.log("Marker:", marker, dist);
        }

        // If there are any vistied markers, start the fxn to handle them
        if (this.visitedMarkers) {
            console.log("Handle visitedMarkers");
            this.handleVisitedMarkers();
        }
    }


    //
    handleVisitedMarkers() {

        // Confirm there are visted markers
        if (this.visitedMarkers) {
            console.log("Handle visitedMarkers fxn");


            // TODO: Send each marker via api
            // Iterate thru visted markers array
            for (let marker of this.visitedMarkers) {

                console.log("Try posting marker to API");

                console.log("If POST fails AND the marker is not already stored then store marker locally");

                // List marker as visited
                marker.visited = true;
            }

            // console.log("Done handling markers:", this.visitedMarkers);


            // Save the visited markers to local storage
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem('storedVisitedMarkers', JSON.stringify(this.visitedMarkers) );
            }

            // Let user konw the upload failed and storage is not available
            else {
                 window.alert("Sorry! The upload has failed and your device does not have Web Storage support.");
            }

            this.getLocalStorage();
        }
    }


    //
    getLocalStorage() {

        // Save the visited markers to local storage
        if (typeof(Storage) !== "undefined") {
            this.markerInLocalStorage = JSON.parse(localStorage.getItem('storedVisitedMarkers'));
        }

        // Let user know local storage is not available
        else {
             window.alert("Sorry! Your device does not have Web Storage support.");
        }
    }


    ngOnDestroy() {
        this.gpsSubscription.unsubscribe();
    }

}
