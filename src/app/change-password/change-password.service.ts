import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { environment } from '../../environments/environment';
import { CommonServiceService } from '../../services/common-service/common-service.service';

@Injectable()
export class ChangePasswordService {
	private hostUrl = environment.API_URL
	baseUrl = "/api/v1/user";
	constructor(public authHTTP: AuthHttp) { }

	changePassword = (url, params:any = {}) => {
		return this.authHTTP.post(this.hostUrl + this.baseUrl + url, params).map(res => res.json());
	}
}
