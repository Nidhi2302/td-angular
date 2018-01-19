import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { environment } from '../../environments/environment'

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { LocalStorageService } from './../local-storage/local-storage.service';

@Injectable()
export class AppHttpService {
  private hostUrl = environment.API_URL;

  constructor(public http: Http, private router: Router, public localStorage: LocalStorageService, public authHTTP: AuthHttp) { }

  getHeader(headerOptions, params = {}, doNotSendAuthorizationParam) {
    var headerParams = {};
    if (doNotSendAuthorizationParam !== true) {
      //send authorization param
      headerParams['x-auth-token'] = localStorage.getItem('secret_token');
    }
    if (headerOptions) {
      Object.assign(headerParams, headerOptions);
    }

    let qParams: URLSearchParams = new URLSearchParams();
    for (let key in params) {
      qParams.set(key, params[key]);
    }

    let headers = new Headers(headerParams);
    let req = new RequestOptions({ headers: headers });
    req.search = qParams;
    return req;
  }

  get(url, params: any = {}, headerOptions: any = {}, doNotSendAuthorizationParam: boolean = true) {
    let options = this.getHeader(headerOptions, params, doNotSendAuthorizationParam);
    console.log(this.hostUrl + url, options);
    return this.http.get(this.hostUrl + url, options).map(res => res.json());
  }

  post(url, params: any = {}, headerOptions: any = {}, doNotSendAuthorizationParam: boolean = false) {
    let options = this.getHeader(headerOptions, {}, doNotSendAuthorizationParam);
    return this.http.post(this.hostUrl + url, params, options).map(res => res.json());
  }

  put(url, params: any = {}, headerOptions: any = {}, doNotSendAuthorizationParam: boolean = false) {
    let options = this.getHeader(headerOptions, {}, doNotSendAuthorizationParam);
    return this.http.put(this.hostUrl + url, params, options).map(res => res.json());
  }

  delete(url, headerOptions: any = {}, doNotSendAuthorizationParam: boolean = false) {
    let options = this.getHeader(headerOptions, {}, doNotSendAuthorizationParam);
    return this.http.delete(this.hostUrl + url, options).map(res => res.json());
  }
  postForUplod(url, params: FormData) {
    let headersData = new Headers();
    console.log(params)
    headersData.append('x-auth-token', localStorage.getItem('secret_token'));

    let opts: RequestOptions = new RequestOptions({ headers: headersData });

    return this.http.post(this.hostUrl + url, params, opts).map(res => res.json());
  }
}
