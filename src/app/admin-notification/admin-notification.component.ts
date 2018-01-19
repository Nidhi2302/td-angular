import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from './../../services/validation/validation.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { GeneralService } from '../../services/general/general.service';
import { NotificationService } from '../../services/notification/notification.service';

declare let $: any;

@Component({
	selector: 'app-admin-notification',
	templateUrl: './admin-notification.component.html',
	styleUrls: ['./admin-notification.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class AdminNotificationComponent implements OnInit {

	public adminNotificationForm: FormGroup;
	public messages: any = {};
	errMsg;
	public notificationList: any = [
		{
			value: 'All',
			receiversType: 'All',
		},
		{
			value: 'Managers',
			receiversType: 'Managers',
		},
		{
			value: 'IndividualDrivers',
			receiversType: 'Individual Drivers',
		},
		{
			value: 'EnterpriseDrivers',
			receiversType: 'Enterprise Drivers',
		}
	];
	public notificationType: any = [
		{
			value: 'SMS_Email',
			name: 'SMS & Email',
		},
		{
			value: 'SMS',
			name: 'Only SMS',
		},
		{
			value: 'Email',
			name: 'Only Email',
		}
	];
	receiversTypes = ["All"]
	notificationMessage = '';
	constructor(private router: Router, private notificationService: NotificationService) {
		let self = this;

		self.messages = GeneralService.getValidatorErrorMessage();
		//self.resetNotificationForm();

		// notificationData.receiversType = ['All', 'IndividualDrivers', 'Managers', 'EnterpriseDrivers', 'AdminPayment', 'AutoPayment', 'BookingUsers']

	}


	ngOnInit() {

	}
	selectCheckBox(ev) {
		if (ev.target.checked) {
			this.receiversTypes.push(ev.target.value)
		} else {
			this.receiversTypes = this.receiversTypes.filter(re => re != ev.target.value)
		}
		console.log(this.receiversTypes)
	}
	sendNotification() {
		let params = {
			notificationMessage: this.notificationMessage,
			receiversTypes: this.receiversTypes
		}
		this.notificationService.sendNotification(params).then(res => {
			console.log(res);
			$('.alert.alert-success').show();
			setTimeout(() => {
				$('.alert.alert-success').hide();
			}, 6000);
			this.notificationMessage="";
		}).catch(err => {
			$('.alert.alert-danger').show();
			setTimeout(() => {
				$('.alert.alert-danger').hide();
			}, 6000);
		})
	}
}
