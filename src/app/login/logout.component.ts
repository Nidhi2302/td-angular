import { Router } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-logout',
	template: '<p></p>',
	styleUrls: ['./login.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class LogoutComponent {

    constructor(private route: Router) {
        localStorage.clear()
        this.route.navigate(['']);
	}
}
