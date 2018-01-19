import { Injectable } from '@angular/core';
import { AppHttpService } from '../../services/app-http/app-http.service';
import { Observable } from 'rxjs/Observable';
import { resolve, reject } from 'q';

@Injectable()
export class PaymentDetailsService {
	baseUrl = "/api/v1/payment";
	constructor(private appHttpService: AppHttpService) { }

	getTotalCollectionByUser = (userDetails) => {
		return new Promise((resolve, reject) => {
			this.appHttpService.post(this.baseUrl + '/get-total-collection-by-user', userDetails, {}, false).subscribe(res => {
				resolve(res);
			}, err => {
				reject(err);
			})
		})

	}
}
