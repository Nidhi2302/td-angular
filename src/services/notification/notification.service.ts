import { Injectable } from '@angular/core';
import { AppHttpService } from '../app-http/app-http.service';

@Injectable()
export class NotificationService {
  baseUrl = "/api/v1/notification";
  constructor(private appHttpService: AppHttpService) { }
  
	sendNotification = (params) => {
		return new Promise((resolve, reject) => {
			this.appHttpService.post(this.baseUrl + '/send-notification', params,{}, false).subscribe(res => {
				console.log("inside NotificationService", res);
				resolve(res);
			}, err => {
				reject(err);
			})
		})
  }
  getBadgeCount = ()=>{
    return new Promise((resolve, reject) => {
			this.appHttpService.get(this.baseUrl + '/get-badgeCount', {},{}, false).subscribe(res => {
				console.log("inside NotificationService", res);
				resolve(res);
			}, err => {
				reject(err);
			})
		})
  }
}
