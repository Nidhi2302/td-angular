import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from './../../services/validation/validation.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { GeneralService } from '../../services/general/general.service';
import { ReportService } from './report.service';

declare let $: any;

@Component({
	selector: 'app-report',
	templateUrl: './report.component.html',
	styleUrls: ['./report.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class ReportComponent implements OnInit {

	/**
	 * spaceId:5a1beff6b7254f00bce4046e   
	 * spaceType:list/book
	 * reportedBy:5a1411a6e1d55c3965c34d63
	 * issue:Test "Frd Management System".
	 * listId:"LI000002"/"B"
	 */
	public Id: String = '';
	public title: String = '';
	public reportForm: FormGroup;
	public messages: any = {};
	public reqObj: any = {};
	public isLoading: Boolean = false;
	public errMsg;

	constructor(private _fb: FormBuilder, localStorageService: LocalStorageService, private route: Router, private activeRoute: ActivatedRoute, private RS: ReportService) {
		let self = this;
		self.reportFormReset();
		let reqData: any = self.activeRoute.snapshot.params;
		let currentUser = localStorage.getItem('id');

		self.messages = GeneralService.getValidatorErrorMessage();
		if (reqData.type == 'booking') {
			self.reqObj = {
				spaceType: 'book',
				spaceId: reqData.id,
				reportedBy: currentUser,
				issue: '',
				bookId: reqData.blId,
				listId: ''
			}
			self.title = "BookingID:"
			self.checkValidListingBooking();
		} else if (self.activeRoute.snapshot.params.type == 'listing') {
			self.reqObj = {
				spaceType: 'list',
				spaceId: reqData.id,
				reportedBy: currentUser,
				issue: '',
				bookId: '',
				listId: reqData.blId
			}
			self.title = "ListingID:"
			self.checkValidListingBooking();
		} else {
			self.route.navigate(['/']);
		}
		console.log(reqData);
		self.Id = reqData.blId;
	}

	reportFormReset() {
		let self = this;
		self.reportForm = self._fb.group({
			issue: ['', Validators.compose([Validators.required, Validators.maxLength(360)])],
		})
	}

	reportIssue() {
		let self = this;
		self.reqObj.issue = self.reportForm.value.issue;
		self.isLoading = true;
		self.RS.reportIssue(self.reqObj).then(res => {
			self.isLoading = false;
			$('.alert.alert-success').show();
			self.reportFormReset();
			setTimeout(() => {
				$('.alert.alert-success').hide();
			}, 6000);
		}).catch(err => {
			self.errMsg = err.json();
			self.isLoading = false;
			$('.alert.alert-danger').show();
			setTimeout(() => {
				$('.alert.alert-danger').hide();
			}, 6000);
		})
	}

	checkValidListingBooking(){
		let self = this;
		self.RS.checkValidBookingListing(self.activeRoute.snapshot.params).then(res => {
			console.log(res)
		}).catch(err => {
			self.errMsg = err.json();
			$('.alert.alert-danger').show();
			setTimeout(() => {
				$('.alert.alert-danger').hide();
				self.route.navigate(['/history']);
			}, 6000);
		})
	}

	ngOnInit() {
	}

}
