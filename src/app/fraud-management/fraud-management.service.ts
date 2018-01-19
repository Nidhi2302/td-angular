import { Injectable } from '@angular/core';
import { AppHttpService } from '../../services/app-http/app-http.service';

@Injectable()
export class FraudManagementService {

	baseUrl = "/api/v1/report";
	constructor(private appHttpService: AppHttpService) { }
	getFraudBookingsReport = () => {
		return new Promise((resolve, reject) => {
			this.appHttpService.get(this.baseUrl + '/get-fraud-bookings-report', {}, true).subscribe(res => {
				console.log("inside history", res);
				resolve(res);
			}, err => {
				reject(err);
			})
		})
	}

	getFraudListingReport = () => {
		return new Promise((resolve, reject) => {
			this.appHttpService.get(this.baseUrl + '/get-fraud-listings-report', {}, true).subscribe(res => {
				console.log("inside history", res);
				resolve(res);
			}, err => {
				reject(err);
			})
		})
	}

}
