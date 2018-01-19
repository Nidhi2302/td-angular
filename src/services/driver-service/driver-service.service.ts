import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';

import { environment } from '../../environments/environment'

@Injectable()
export class DriverServiceService implements CanLoad {
  private hostUrl = environment.API_URL;
  constructor(private router: Router, public authHTTP: AuthHttp) { }

  canLoad() {
    if (localStorage.getItem('userType') == 'Individual') {
      return true;
    } else {
      let home = localStorage.getItem('home') != null ? localStorage.getItem('home') : "/login";
      this.router.navigate([home]);
      return false;
    }
  }
}
