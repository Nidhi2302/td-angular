import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FraudManagementService } from './fraud-management.service';

declare let $: any;

@Component({
	selector: 'app-fraud-management',
	templateUrl: './fraud-management.component.html',
	styleUrls: ['./fraud-management.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class FraudManagementComponent implements OnInit {
	public bookingReports: any = [];
	public listingReports: any = [];
	public errMsg: any = {};

	constructor(private FS: FraudManagementService, private router: Router) {
		let self = this;
		self.getBookingReports();
	}

	getBookingReports(){
		let self = this;
		self.FS.getFraudBookingsReport().then(res => {
			self.bookingReports = res;
		}).catch(err => {
			self.errMsg = err.json();
			$('.alert.alert-danger').show();
			setTimeout(() => {
				$('.alert.alert-danger').hide();
			}, 6000);
		})
	}

	getListingReports(){
		let self = this;
		self.FS.getFraudListingReport().then(res => {
			self.listingReports = res;
		}).catch(err => {
			self.errMsg = err.json();
			$('.alert.alert-danger').show();
			setTimeout(() => {
				$('.alert.alert-danger').hide();
			}, 6000);
		})
	}

	ngOnInit() {
	}

}
