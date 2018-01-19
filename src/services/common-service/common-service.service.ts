import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AppHttpService } from '../app-http/app-http.service';

import { environment } from '../../environments/environment'

@Injectable()
export class CommonServiceService implements CanActivate {
  private hostUrl = environment.API_URL;
  baseUrl = "/api/v1/user";
  baseUrlPayment = "/api/v1/payment";
  baseUrlFeedback ="/api/v1/feedback"
  constructor(private appHttpService: AppHttpService, private router: Router, public authHTTP: AuthHttp) { }


  usernameExists = (params) => {
    return new Promise((resolve, reject) => {
      this.appHttpService.post(this.baseUrl + '/username-exists', params, {}, true).subscribe(res => {
        console.log("inside individual-sign-up-service", res);
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  emailExists = (params) => {
    return new Promise((resolve, reject) => {
      this.appHttpService.post(this.baseUrl + '/email-exists', params, {}, true).subscribe(res => {
        console.log("inside individual-sign-up-service", res);
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }
  cancleSub = () => {
    return new Promise((resolve, reject) => {
      this.appHttpService.get(this.baseUrlPayment + '/auto-payment-off', {}, {}, false).subscribe(res => {
        console.log("inside auto-payment-off ", res);
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  otp = (params) => {
    return new Promise((resolve, reject) => {
      this.appHttpService.post(this.baseUrl + '/otp', params, {}, true).subscribe(res => {
        console.log("inside common-service", res);
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  getUserProfile(url, params: any = {}, headerOptions: any = {}, doNotSendAuthorizationParam: boolean = true) {
    return this.authHTTP.get(this.hostUrl + url, {}).map(res => res.json());
  }

  profileUpdate(url, params: any = {}, headerOptions: any = {}, doNotSendAuthorizationParam: boolean = true) {
    return this.authHTTP.post(this.hostUrl + url, params).map(res => res.json());
  }

  getDriverList(url, params, headerOptions: any = {}, doNotSendAuthorizationParam: boolean = true) {
    return this.authHTTP.get(this.hostUrl + url + 'driverType=' + params).map(res => res.json());
  }

  getManagerList(url, params: any = {}, headerOptions: any = {}, doNotSendAuthorizationParam: boolean = true) {
    return this.authHTTP.get(this.hostUrl + url, {}).map(res => res.json());
  }

  canActivate() {
    if (this.check()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  check() {
    const token = localStorage.getItem('secret_token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  signUp = (params) => {
    return new Promise((resolve, reject) => {
      this.appHttpService.post(this.baseUrl + '/sign-up', params, {}, true).subscribe(res => {
        console.log("inside payment-service", res);
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  signAgreement = (params) => {
    return new Promise((resolve, reject) => {
      this.appHttpService.post(this.baseUrl + '/sign-agreement', params, {}, true).subscribe(res => {
        console.log("inside individual-sign-up-service", res);
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  sendMessage = (params) => {
    return new Promise((resolve, reject) => {
      this.appHttpService.post(this.baseUrlFeedback + '/save-feedback', params, {}, false).subscribe(res => {
        console.log("inside sendMessage", res);
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  canLoad() {
    if (!localStorage.getItem('name')) {
      return true;
    } else {
      let home = localStorage.getItem('home') != null ? localStorage.getItem('home') : "/login";
      this.router.navigate([home]);
      return false;
    }
  }
}
