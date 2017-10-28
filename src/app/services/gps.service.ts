import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Coordinates } from '../models/coordinates';


const GEOLOCATION_ERRORS = {
	'errors.location.unsupportedBrowser': 'Browser does not support location services',
	'errors.location.permissionDenied': 'You have rejected access to your location',
	'errors.location.positionUnavailable': 'Unable to determine your location',
	'errors.location.timeout': 'Service timeout has been reached'
};


@Injectable()
export class GpsService {

    constructor() { }


    public getLocation(): Observable<any> {

        return Observable.create(observer => {

            if (window.navigator && window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition(
                (position) => {
                    observer.next(position);
                    observer.complete();
                },
                (error) => {
                    switch (error.code) {
                        case 1:
                            observer.error(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
                            break;
                        case 2:
                            observer.error(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
                            break;
                        case 3:
                            observer.error(GEOLOCATION_ERRORS['errors.location.timeout']);
                            break;
                    }
                });
            }
            else {
            observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
            }

        });
    }

    public watchLocation(): Observable<any> {

        return Observable.create(observer => {

            if (window.navigator && window.navigator.geolocation) {
                window.navigator.geolocation.watchPosition(
                (position) => {
                    console.log("service.watchLocation()",position);
                    observer.next(position);
                },
                (error) => {
                    switch (error.code) {
                        case 1:
                            observer.error(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
                            break;
                        case 2:
                            observer.error(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
                            break;
                        case 3:
                            observer.error(GEOLOCATION_ERRORS['errors.location.timeout']);
                            break;
                    }
                }, {
                  enableHighAccuracy: true,
                  maximumAge        : 30000,
                  timeout           : 27000
                }

            );
            }
            else {
            observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
            }

        });
    }
}
