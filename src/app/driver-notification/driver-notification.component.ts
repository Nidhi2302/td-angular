import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from './../../services/validation/validation.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import { GeneralService } from '../../services/general/general.service';
import { DriverNotificationService } from './driver-notification.service';

declare var $: any;
import _ from "lodash";

@Component({
	selector: 'app-driver-notification',
	templateUrl: './driver-notification.component.html',
	styleUrls: ['./driver-notification.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class DriverNotificationComponent implements OnInit {
	public notificationData: any = [];
	public isLoading: boolean = false;
	errMsg;
	constructor(private DNS: DriverNotificationService) {
		let self = this;
		self.getUserNotifications();
	}

	getUserNotifications() {
		let self = this;
		self.DNS.getUserNotifications().then(res => {
			self.isLoading = false;
			let notificationData: any = [];
			notificationData = res;
			self.notificationData=[];
			if (notificationData.length > 0) {
				_.forEach(notificationData, (notify) => {
					let notificationDate = new Date(notify.createdAt);
					let currentDate = new Date();
					let currentDateStr = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
					let notificationDateStr = notificationDate.getDate() + '/' + (notificationDate.getMonth() + 1) + '/' + notificationDate.getFullYear();
					if (notificationDateStr == currentDateStr) {
						self.notificationData.push({
							"_id": notify._id,
							"notificationType": notify.notificationType,
							"receiversType": notify.receiversType,
							"notificationTitle": notify.notificationTitle,
							"notificationMessage": notify.notificationMessage,
							"createdAt": notify.createdAt,
							"showDate": false
						})
					} else {
						self.notificationData.push({
							"_id": notify._id,
							"notificationType": notify.notificationType,
							"receiversType": notify.receiversType,
							"notificationTitle": notify.notificationTitle,
							"notificationMessage": notify.notificationMessage,
							"createdAt": notify.createdAt,
							"showDate": true
						})
					}
					// if( currentDateStr == notificationDateStr)
					//self.notificationData.push()
				});
			}
			self.DNS.markRead().then(res=>{
				localStorage.setItem("badgeCount","0");
				$('<style>.badge::after{content:unset !important }</style>').appendTo('head');
			}).catch(err=>{
				//nothing
			})
		}).catch(err => {
			self.isLoading = false;
			$('.alert.alert-danger').show();
			setTimeout(() => {
				$('.alert.alert-danger').hide();
			}, 6000);
		})
	}

	ngOnInit() {
		setInterval(() => {
			if(parseInt(localStorage.getItem("badgeCount"))>0){
				this.getUserNotifications();
			}
		},10000);
	}

}
