import { Injectable } from '@angular/core';
import { AppHttpService } from '../../services/app-http/app-http.service';

@Injectable()
export class FraudManagementDetailService {
  baseUrl = "/api/v1/report";
	constructor(private appHttpService: AppHttpService) { }
	getReportDetail = (params) => {
		return new Promise((resolve, reject) => {
			this.appHttpService.get(this.baseUrl + '/report-detail/'+params.type+'/'+params.id, {}, true).subscribe(res => {
				console.log("inside history", res);
				resolve(res);
			}, err => {
				reject(err);
			})
		})
	}
  blockUser = (id) => {
		return new Promise((resolve, reject) => {
			this.appHttpService.get(this.baseUrl + '/block-user/'+id, {}, true).subscribe(res => {
				console.log("inside history", res);
				resolve(res);
			}, err => {
				reject(err);
			})
		})
  }
  unblockUser = (id) => {
		return new Promise((resolve, reject) => {
			this.appHttpService.get(this.baseUrl + '/unblock-user/'+id, {}, true).subscribe(res => {
				console.log("inside history", res);
				resolve(res);
			}, err => {
				reject(err);
			})
		})
	}

}
