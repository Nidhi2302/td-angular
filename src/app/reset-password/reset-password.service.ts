import { Injectable } from '@angular/core';
import { AppHttpService } from '../../services/app-http/app-http.service';
import { Observable } from 'rxjs/Observable';
import { resolve, reject } from 'q';

@Injectable()
export class ResetPasswordService {
	baseUrl = "/api/v1/user";
	constructor(private appHttpService: AppHttpService) { }

	resetPassword = (params) => {
		return new Promise((resolve, reject) => {
			this.appHttpService.post(this.baseUrl + '/reset-password', params, {}, true).subscribe(res => {
				console.log("inside individual-sign-up-service", res);
				resolve(res);
			}, err => {
				reject(err);
			})
		})
	}
	isActivated = (params) => {
		return new Promise((resolve, reject) => {
			this.appHttpService.get(this.baseUrl + '/isActivated/'+params,{}, {}, true).subscribe(res => {
				console.log("inside individual-sign-up-service", res);
				resolve(res);
			}, err => {
				reject(err);
			})
		})
	}
}
