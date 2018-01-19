import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';

import { environment } from '../../environments/environment'

@Injectable()
export class AdminServiceService implements CanLoad {
  private hostUrl = environment.API_URL;
  constructor(private router: Router, public authHTTP: AuthHttp) { }

  canLoad() {
    if (localStorage.getItem('role') == 'super') {
        return true;
    } else {
      this.router.navigate([localStorage.getItem('home')]);
    }
  }
}
