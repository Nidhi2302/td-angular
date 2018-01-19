import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentDetailsService } from './payment-details.service';

declare let $: any;

@Component({
	selector: 'app-payment-details',
	templateUrl: './payment-details.component.html',
	styleUrls: ['./payment-details.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class PaymentDetailsComponent implements OnInit {

	public userDetails: any = {
		_id: '',
		name: '',
		paymentData: []
	};

	constructor(private PDS: PaymentDetailsService, private router: Router, private activeRoute: ActivatedRoute) {
		let self = this;

		self.getTotalCollectionByUser();
	}

	getTotalCollectionByUser() {
		let self = this;
		let userDetails = { userId: self.activeRoute.snapshot.params.userId };
		self.PDS.getTotalCollectionByUser(userDetails).then(res => {
			self.userDetails = res;
		}).catch(err => {
			self.userDetails = {
				_id: '',
				name: '',
				paymentData: []
			};
		})
	}

	ngOnInit() {
	}
}
