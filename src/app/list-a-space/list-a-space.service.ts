import { Injectable } from '@angular/core';
import { AppHttpService } from '../../services/app-http/app-http.service';
import { Observable } from 'rxjs/Observable';
import { resolve, reject } from 'q';

@Injectable()
export class ListASpaceService {
  baseUrl = "/api/v1/list";
	constructor(private appHttpService: AppHttpService) { }
  
  createSpace = (params) => {
		return new Promise((resolve, reject) => {
			this.appHttpService.post(this.baseUrl + '/list-a-space', params, {}, false).subscribe(res => {
				console.log("inside individual-sign-up-service", res);
				resolve(res);
			}, err => {
				reject(err);
			})
		})

	}
}
