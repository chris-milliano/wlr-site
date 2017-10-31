import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocationButtonComponent } from '../../components/location-button/location-button.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(
        private router: Router
    ) { }

    ngOnInit() { }


    goTo (path: string) {
        this.router.navigateByUrl(path);
    }

    // TODO: Check user for gps and local storage capabiliies
}
