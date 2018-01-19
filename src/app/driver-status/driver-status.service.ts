import { Injectable } from '@angular/core';
import { AppHttpService } from '../../services/app-http/app-http.service';

@Injectable()
export class DriverStatusService {
  baseUrl = "/api/v1/book";
  constructor(private appHttpService: AppHttpService) { }
  driverStatus= () => {
		return new Promise((resolve, reject) => {
			 this.appHttpService.get(this.baseUrl + '/driver-status','', {}, false).subscribe(res => {
				console.log("inside find a space", res);
				resolve(res);
			}, err => {
				reject(err);
			}) 
		})
  }
}
