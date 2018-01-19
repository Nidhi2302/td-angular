import { CustomValidators } from 'ng2-validation';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { ValidationService } from './../../services/validation/validation.service';

import { ResetPasswordService } from './reset-password.service';

declare let $: any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResetPasswordComponent implements OnInit {
  public isLoading = false;
  public submitted = false;
  public resetForm: FormGroup;

  constructor(private RPS: ResetPasswordService, private router: Router, private _fb: FormBuilder, private actRoute: ActivatedRoute) {
    this.resetForm = this._fb.group({
      password: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
      confirmPassword: ['', ValidationService.patternValidation(".*\\S.*")]
    }, { validator: ValidationService.checkPasswords });
    this.RPS.isActivated(this.actRoute.snapshot.params['userId']).then(res => {
      //nothing
    }).catch(err => {
      this.router.navigate(["not-found"])
    })
  }

  ngOnInit() {
  }

  addHidden() {
    $('.confirmPassword').addClass('sr-only');
  }

  resetForms(userDetail, isValid) {
    this.submitted = true;
    if (!isValid) {
      return;
    }


    this.isLoading = true;
    userDetail.userId = this.actRoute.snapshot.params['userId'];

    this.RPS.resetPassword(userDetail).then(res => {
      this.isLoading = false;
      console.log("inside submit", res);
      if (res["isAgreementSign"]) {
        this.router.navigate(['/login']);
      } else {
        sessionStorage.setItem("userId", this.actRoute.snapshot.params['userId'])
        sessionStorage.setItem("userInfo", JSON.stringify({ "phoneNumber": res["phoneNumber"] }));
        this.router.navigate(['/terms-condition']);
      }
      $('.alert.alert-success').show();
      setTimeout(() => {
        $('.alert.alert-success').hide();
      }, 6000);
    }).catch(err => {
      this.isLoading = false;
      $('.alert.alert-danger').show();
      setTimeout(() => {
        $('.alert.alert-danger').hide();
      }, 6000);
    })
  }
}
