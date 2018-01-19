import { Injectable } from '@angular/core';
import { AppHttpService } from '../../services/app-http/app-http.service';
import { Observable } from 'rxjs/Observable';
import { resolve, reject } from 'q';

@Injectable()
export class ReportService {
  baseUrl = "/api/v1/report";
	constructor(private appHttpService: AppHttpService) { }
  
  reportIssue = (params) => {
		return new Promise((resolve, reject) => {
			this.appHttpService.post(this.baseUrl + '/report-issue', params, {}, false).subscribe(res => {
				resolve(res);
			}, err => {
				reject(err);
			})
		})

  }
  
  checkValidBookingListing = (params) => {
		return new Promise((resolve, reject) => {
			this.appHttpService.post(this.baseUrl + '/report-check-for-valid', params, {}, false).subscribe(res => {
				resolve(res);
			}, err => {
				reject(err);
			})
		})

  }
}
