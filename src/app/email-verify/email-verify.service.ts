import { Injectable } from '@angular/core';
import { AppHttpService } from '../../services/app-http/app-http.service';
import { Observable } from 'rxjs/Observable';
import { resolve, reject } from 'q';

@Injectable()
export class EmailVerifyService {
  baseUrl = "/api/v1/user";
	constructor(private appHttpService: AppHttpService) { }

	emailVerify = (params) => {
		return new Promise((resolve, reject) => {
			this.appHttpService.get(this.baseUrl + '/email-verify/'+params,{}, {}, true).subscribe(res => {
				console.log("inside individual-sign-up-service", res);
				resolve(res);
			}, err => {
				reject(err);
			})
		})
	}
}
