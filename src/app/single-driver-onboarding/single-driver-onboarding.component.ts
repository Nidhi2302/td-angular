import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ValidationService } from '../../services/validation/validation.service';
import { CommonServiceService } from '../../services/common-service/common-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { SingleDriverOnboardingService } from './single-driver-onboarding.service';
import { GeneralService } from '../../services/general/general.service';
declare let $: any;

@Component({
	selector: 'app-single-driver-onboarding',
	templateUrl: './single-driver-onboarding.component.html',
	styleUrls: ['./single-driver-onboarding.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class SingleDriverOnboardingComponent implements OnInit {

	signupForm: FormGroup;
	isLoading = false;
	isEmailValid: boolean = false;
	isPhoneValid: boolean = false;
	public isValidFileType: Boolean = true;
	public importFileFormate = ['text/csv', "application/vnd.ms-excel", 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
	errMsg;
	truckTypes = ["Big", "Small", "3", "4", "5", "6"];
	userData: FormData;
	public fileUploaded: Boolean = false;
	invalidFile: boolean = false;
	invalidNumber = []
	invalidEmail = []
	stateList=[];
	numberRequire:boolean=false;
	public mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
	constructor(private fb: FormBuilder, private router: Router, private localStorageService: LocalStorageService, private commonServiceService: CommonServiceService, private singleDriverOnboardingService: SingleDriverOnboardingService) {

		this.signupForm = this.fb.group({
			firstname: ['', ValidationService.patternValidation(".*\\S.*")],
			lastname: ['', ValidationService.patternValidation(".*\\S.*")],
			username: ['', ValidationService.patternValidation("^[a-zA-Z0-9@.\\-_]*$")],
			cb_radio_handle: ['', ValidationService.patternValidation(".*\\S.*")],
			organization: ['', Validators.compose([Validators.pattern(".*\\S.*")])],
			address: ['', ValidationService.patternValidation(".*\\S.*")],
			city: ['', ValidationService.patternValidation(".*\\S.*")],
			state: ['', ValidationService.patternValidation(".*\\S.*")],
			email: ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
			phoneNumber: ['', Validators.compose([Validators.required])],
			truckType: [this.truckTypes[0]],
			truckLength: ['', ValidationService.patternValidation("^[0-9]*$")],
			truckNumber: ['', ValidationService.patternValidation(".*\\S.*")]
		});
		this.stateList = GeneralService.getStates();
	}

	ngOnInit() {

	}

	submit(formData: any) {
		console.log(formData);
		this.isLoading = true;
		let phoneNumber= formData.phoneNumber.replace(/\D+/g, '');
		if(phoneNumber==''||phoneNumber==null){
			this.numberRequire=true;
			this.isLoading = false;
			return;
		  }else{
			this.numberRequire=false;
		  }   
		this.commonServiceService.usernameExists({ "username": formData.username }).then(res2 => {
			console.log("inside submit", res2);
			this.commonServiceService.emailExists({ "email": formData.email }).then(res => {
				console.log("inside submit", res);
				this.isEmailValid = false;
				this.commonServiceService.otp({ "phoneNumber": phoneNumber }).then(res1 => {
					console.log("inside submit", res1);
					this.isPhoneValid = false;
					formData["userType"] = "Individual";
					formData["enterpriseId"] = localStorage.getItem("id");

					this.commonServiceService.signUp(formData).then(res3 => {
						console.log("inside sinlge submit ", res3);
						this.signupForm.reset();
						this.signupForm.get('truckType').setValue(this.truckTypes[0]);
						this.isLoading = false;
						$('.alert.alert-success').show();
						setTimeout(() => {
							$('.alert.alert-success').hide();
						}, 6000);
					}).catch(err3 => {
						console.log("inside sinlge submit ", err3);
						this.isLoading = false;
						let msg = err3.json();
						this.errMsg = msg;
						$('.alert.alert-danger').show();
						setTimeout(() => {
							$('.alert.alert-danger').hide();
						}, 6000);
					})

				}).catch(err1 => {
					this.isLoading = false;
					this.isPhoneValid = true;
					let msg = err1.json();
					this.errMsg = msg;
					$('.alert.alert-danger').show();
					setTimeout(() => {
						$('.alert.alert-danger').hide();
					}, 6000);
				})
			}).catch(err => {
				this.isLoading = false;
				this.isEmailValid = true;
				let msg = err.json();
				this.errMsg = msg;
				$('.alert.alert-danger').show();
				setTimeout(() => {
					$('.alert.alert-danger').hide();
				}, 6000);
			})

		}).catch(err => {
			this.isLoading = false;
			let msg = err.json();
			this.errMsg = msg;
			$('.alert.alert-danger').show();
			setTimeout(() => {
				$('.alert.alert-danger').hide();
			}, 6000);
		})
		

	}

	addImportUserFile(event) {
		this.userData = new FormData();
		let target = event.target || event.srcElement;

		if (target.files) {
			let fileList: FileList = event.target.files;
			if (fileList.length > 0) {
				let file: File = fileList[0];
				console.log(file);
				this.isValidFileType = (this.importFileFormate.indexOf(file.type) === -1) ? false : true;
				this.userData.append('usersList', file, file.name);
				if (!this.isValidFileType) {
					this.errMsg = "File type invalid";
					this.fileUploaded = false;
					$('.alert.alert-danger').show();
					setTimeout(() => {
						$('.alert.alert-danger').hide();
					}, 6000);
				} else {
					this.fileUploaded = true;
					$('<style>.custom-file-control:lang(en)::after{content:"' + file.name + '" !important}</style>').appendTo('head');
				}
			}
			else {
				this.errMsg = "Please choose file.";
				$('.alert.alert-danger').show();
				setTimeout(() => {
					$('.alert.alert-danger').hide();
				}, 6000);
			}
		} else {
			this.errMsg = "Please choose file.";
			$('.alert.alert-danger').show();
			setTimeout(() => {
				$('.alert.alert-danger').hide();
			}, 6000);
		}
	}

	importUser() {
		this.isLoading = true

		if (this.fileUploaded) {
			// console.log("userData", this.userData)
			this.singleDriverOnboardingService.importUser(this.userData).then(res => {
				this.isLoading = false;
				this.invalidFile = false;
				console.log(res)
				$('<style>.custom-file-control:lang(en)::after{content:"Choose file..." !important}</style>').appendTo('head');
				$('.alert.alert-success').show();
				setTimeout(() => {
					$('.alert.alert-success').hide();
				}, 6000);
			}).catch(err => {
				this.isLoading = false;
				let msg = err.json();
				this.invalidFile = true;
				this.errMsg = msg.message;
				this.invalidEmail = msg.invalidEmail;
				this.invalidNumber = msg.invalidNumber;
			
			})
		}
		else {
			this.isLoading = false;
			this.errMsg = "Please choose file.";
			this.fileUploaded = false;
			$('.alert.alert-danger').show();
			setTimeout(() => {
				$('.alert.alert-danger').hide();
			}, 6000);
		}
	}
}
