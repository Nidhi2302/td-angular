import { Injectable } from '@angular/core';
import { AppHttpService } from '../../services/app-http/app-http.service';
import { Observable } from 'rxjs/Observable';
import { resolve, reject } from 'q';

@Injectable()
export class ForgotPasswordService {
	baseUrl = "/api/v1/user";
	constructor(private appHttpService: AppHttpService) { }

	forgotPassword = (params) => {
		return new Promise((resolve, reject) => {
			this.appHttpService.post(this.baseUrl + '/forgot-password', params, {}, true).subscribe(res => {
				console.log("inside individual-sign-up-service", res);
				resolve(res);
			}, err => {
				reject(err);
			})
		})
	}
}
