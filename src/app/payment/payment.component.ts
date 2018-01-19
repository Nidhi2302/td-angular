import { Component, OnInit, ViewEncapsulation, NgZone } from '@angular/core';
import { ValidationService } from '../../services/validation/validation.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PaymentService } from './payment.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { CommonServiceService } from '../../services/common-service/common-service.service';
declare let $: any;

declare var Stripe;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentComponent implements OnInit {
  current = new Date();
  currentYear = this.current.getFullYear()
  years = [];
  public isLoading = false;
  paymentForm: FormGroup;
  userinfo: any = {};
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  constructor(private router: Router, private fb: FormBuilder, private paymentService: PaymentService, private _zone: NgZone, private localStorageService: LocalStorageService, private commonServiceService: CommonServiceService) {

    console.log(this.currentYear);
    this.paymentForm = this.fb.group({
      cardHolderName: ['', ValidationService.patternValidation(".*\\S.*")],
      cardNumber: ['', ValidationService.patternValidation("[0-9]*")],
      expiryMonth: [this.current.getMonth()],
      expiryYear: [this.currentYear],
      cvv: ['', ValidationService.patternValidation("[0-9]*")]
    })
    this.userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
    for (let i = 0; i <= 20; i++) {
      this.years.push(this.currentYear + i);
    }
  }

  ngOnInit() {
  }

  submit(formData) {
    console.log(formData);
    //Stripe token generate
    this.isLoading = true;
    Stripe.card.createToken({
      number: formData.cardNumber,
      exp_month: +formData.expiryMonth + 1,
      exp_year: formData.expiryYear,
      cvc: formData.cvv
    }, (status: number, response: any) => {
      // Wrapping inside the Angular zone
      this._zone.run(() => {
        if (status === 200) {
          console.log('Success! Card token', response.card.id);
          let params = {
            email: this.userinfo['email'].toLowerCase(),
            password: this.userinfo['password'],
            firstname: this.userinfo['firstname'],
            lastname: this.userinfo['lastname'],
            address: this.userinfo['address'],
            username: this.userinfo['username'],
            cb_radio_handle: this.userinfo['cb_radio_handle'],
            organization: this.userinfo['organization'],
            city: this.userinfo['city'],
            state: this.userinfo['state'],
            userType: this.userinfo['userType'],
            phoneNumber: this.userinfo['phoneNumber'],
            truckType: this.userinfo['truckType'],
            truckLength: this.userinfo['truckLength'],
            truckNumber: this.userinfo['truckNumber'],
            otp: this.userinfo['otp'],
            isAgreementSign: true,
            plan: this.userinfo['plan'],
            userCount: this.userinfo['userCount'],
            token: response.id
          }

          this.commonServiceService.signUp(params).then(res => {
            console.log("inside payment submit ", res);
           sessionStorage.clear()
            sessionStorage.setItem("back", "true");
            sessionStorage.setItem("errMsg", "Signup successfully! Please check your email for an important email from us.Email verification is required before you can sign in to use the app.");
            this.isLoading = false;
            $('.alert.alert-success').show();
            setTimeout(() => {
              $('.alert.alert-success').hide();
            }, 6000);
            this.router.navigate(["/login"]);
          }).catch(err => {
            this.isLoading = false;

            $('.alert.alert-danger').show();
            setTimeout(() => {
              $('.alert.alert-danger').hide();
            }, 6000);
          })
        } else {
          this.isLoading = false;

          $('.alert.alert-danger').show();
          setTimeout(() => {
            $('.alert.alert-danger').hide();
          }, 6000);
          console.log(response.error.message);
        }
      });
    });

  }
}
