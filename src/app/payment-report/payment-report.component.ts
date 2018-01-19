import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentReportService } from './payment-report.service';

declare let $: any;

@Component({
	selector: 'app-payment-report',
	templateUrl: './payment-report.component.html',
	styleUrls: ['./payment-report.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class PaymentReportComponent implements OnInit {

	public collection: any = {
		totalAmount: 0,
		individual: 0,
		enterprise: 0
	};

	constructor(private PRS: PaymentReportService, private router: Router) {
		let self = this;
		self.getTotalCollection();
	}

	getTotalCollection() {
		let self = this;
		self.PRS.getTotalCollection().then(res => {
			self.collection = res;
		}).catch(err => {
			self.collection = {
				totalAmount: 0,
				individual: 0,
				enterprise: 0
			};
		})
	}

	ngOnInit() {
	}

}

