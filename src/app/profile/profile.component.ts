import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { CommonServiceService } from '../../services/common-service/common-service.service';
import { ValidationService } from '../../services/validation/validation.service';
import { GeneralService } from '../../services/general/general.service';

declare let $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  public userId = '';
  public userForm: FormGroup;
  public submitted = false;
  public emailExists = false;
  truckTypes = ["Big", "Small", "3", "4", "5", "6"];
  private baseUrl = "/api/v1/user";
  successMsg = "Your profile details updated successfully."
  paymentAutoRenewal: boolean = false;
  stateList = [];
  public mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  notificationTypes = [
    {
      name:"Only Text",
      value:"Only SMS"
    },
    {
      name:"Only Email",
      value:"Only Email"
    },
    {
      name:"Text & Email",
      value:"SMS & Email"
    }];
  constructor(public fb: FormBuilder, protected appSer: CommonServiceService, protected router: Router) {
    this.userForm = this.fb.group({
      firstname: ['', ValidationService.patternValidation(".*\\S.*")],
      lastname: ['', ValidationService.patternValidation(".*\\S.*")],
      username: ['', ValidationService.patternValidation("^[a-zA-Z0-9@.\\-_]*$")],
      cb_radio_handle: ['', ValidationService.patternValidation(".*\\S.*")],
      address: ['', ValidationService.patternValidation(".*\\S.*")],
      organization: ['', Validators.compose([Validators.pattern(".*\\S.*")])],
      city: ['', ValidationService.patternValidation(".*\\S.*")],
      state: ['', ValidationService.patternValidation(".*\\S.*")],
      phoneNumber: ['', Validators.compose([Validators.required])],
      truckType: [this.truckTypes[0]],
      truckLength: ['', ValidationService.patternValidation("^[0-9]*$")],
      truckNumber: ['', ValidationService.patternValidation(".*\\S.*")],
      email: ['', [Validators.required, CustomValidators.email]],
      notificationType: [this.notificationTypes[0]],
    });
    this.stateList = GeneralService.getStates();
    this.appSer.getUserProfile(this.baseUrl + '/profile-detail').subscribe(data => {
      this.userId = data._id;
      this.userForm.controls['city'].setValue(data.city);
      this.userForm.controls['firstname'].setValue(data.firstname);
      this.userForm.controls['lastname'].setValue(data.lastname);
      this.userForm.controls['state'].setValue(data.state);
      this.userForm.controls['email'].setValue(data.email);
      this.userForm.controls['cb_radio_handle'].setValue(data.cb_radio_handle);
      this.userForm.controls['address'].setValue(data.address);
      this.userForm.controls['organization'].setValue(data.organization);
      this.userForm.controls['username'].setValue(data.username);
      this.userForm.controls['truckType'].setValue(data.truckType);
      this.userForm.controls['truckLength'].setValue(data.truckLength);
      this.userForm.controls['truckNumber'].setValue(data.truckNumber);
      this.userForm.controls['phoneNumber'].setValue(data.phoneNumber);
      this.userForm.controls['notificationType'].setValue(data.notificationType);
      this.paymentAutoRenewal = data.paymentAutoRenewal;
      $('.notification2').prop('checked', data.notification);
    }, err => {
      console.log(err.message);
    });
  }

  ngOnInit() {
  }

  userForms(userDetail, isValid) {
    this.submitted = true;
    if (!isValid) {
      return;
    }
    console.log($('.notification2'));
    userDetail.notification = $('.notification2').prop('checked');
    this.appSer.emailExists({ "email": userDetail.email, "userId": this.userId }).then(res => {
      this.submitted = true;
      this.emailExists = false;
      this.appSer.profileUpdate(this.baseUrl + '/profile-update', userDetail).subscribe(res1 => {
        $('.alert.alert-success').show();
        setTimeout(() => {
          $('.alert.alert-success').hide();
        }, 6000);
        localStorage.setItem('username', userDetail.username)
      })
    }).catch(err => {
      console.log('object');
      this.submitted = false;
      this.emailExists = true;
    })
  }
  cancleSub() {
    this.appSer.cancleSub().then(res => {
      this.successMsg = res["message"];
      $('.alert.alert-success').show();
      setTimeout(() => {
        $('.alert.alert-success').hide();
      }, 6000);
    }).catch(err => {

    })
  }
}
