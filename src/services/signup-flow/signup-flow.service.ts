import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class SignupFlowService {

  constructor(private router: Router) {

   }
  canLoad() {
    if (sessionStorage.getItem('userInfo')) {
        return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
