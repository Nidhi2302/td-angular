import { CustomValidators } from 'ng2-validation';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { ValidationService } from './../../services/validation/validation.service';

import { SetPasswordService } from './set-password.service';

declare let $: any;

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SetPasswordComponent implements OnInit {
  public isLoading = false;
  public submitted = false;
  public resetForm: FormGroup;

  constructor(private SPS: SetPasswordService, private router: Router, private _fb: FormBuilder, private actRoute: ActivatedRoute) {
    this.resetForm = this._fb.group({
      password: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
      confirmPassword: ['', ValidationService.patternValidation(".*\\S.*")]
    }, { validator: ValidationService.checkPasswords });
    this.SPS.isActivated(this.actRoute.snapshot.params['userId']).then(res => {
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

    this.SPS.resetPassword(userDetail).then(res => {
      this.isLoading = false;
     
      if (res["isAgreementSign"]) {
        this.router.navigate(['/login']);
      } else {
        console.log("inside submit", res["isAgreementSign"]);
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
