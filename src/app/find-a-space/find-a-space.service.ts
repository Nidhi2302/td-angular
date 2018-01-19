import { Injectable } from '@angular/core';
import { AppHttpService } from '../../services/app-http/app-http.service';
import { Observable } from 'rxjs/Observable';
import { resolve, reject } from 'q';

@Injectable()
export class FindASpaceService {
	baseUrl = "/api/v1/list";
	constructor(private appHttpService: AppHttpService) { }
	findASpace = (params) => {
		return new Promise((resolve, reject) => {
			this.appHttpService.post(this.baseUrl + '/find-a-space', params, {}, false).subscribe(res => {
				console.log("inside find a space", res);
				resolve(res);
			}, err => {
				reject(err);
			})
		})
	}
}
