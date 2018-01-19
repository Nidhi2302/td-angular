import { Injectable } from '@angular/core';
import { AppHttpService } from '../../services/app-http/app-http.service';
import { Observable } from 'rxjs/Observable';
import { resolve, reject } from 'q';

@Injectable()
export class DriverNotificationService {
	baseUrl = "/api/v1/notification";
	constructor(private appHttpService: AppHttpService) { }

	getUserNotifications = () => {
		return new Promise((resolve, reject) => {
			this.appHttpService.get(this.baseUrl + '/get-user-notifications', {}, {}, false).subscribe(res => {
				resolve(res);
			}, err => {	
				reject(err);
			})
		})
	}
	markRead=()=>{
		return new Promise((resolve, reject) => {
			this.appHttpService.get(this.baseUrl + '/mark-read', {}, {}, false).subscribe(res => {
				resolve(res);
			}, err => {	
				reject(err);
			})
		})
	}
}
