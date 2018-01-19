import { Injectable } from '@angular/core';
import { AppHttpService } from '../../services/app-http/app-http.service';
import { Observable } from 'rxjs/Observable';
import { resolve, reject } from 'q';

@Injectable()
export class PaymentReportService {
	baseUrl = "/api/v1/payment";
	constructor(private appHttpService: AppHttpService) { }

	getTotalCollection = () => {
		return new Promise((resolve, reject) => {
			this.appHttpService.get(this.baseUrl + '/get-total-collection', {}, {}, false).subscribe(res => {
				resolve(res);
			}, err => {
				reject(err);
			})
		})

	}
}
