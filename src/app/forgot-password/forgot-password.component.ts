import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ForgotPasswordService } from './forgot-password.service';

declare let $: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent implements OnInit {
  public isLoading = false;
  public submitted = false;
  public forgotForm: FormGroup;
  
  constructor(private FPS: ForgotPasswordService, private _fb: FormBuilder, public route: Router) {
    this.forgotForm = this._fb.group({
			email: ['', [Validators.required, CustomValidators.email]],
		})
  }

  ngOnInit() {
  }

  forgotForms(userDetail, isValid) {
    this.submitted = true;
    if (!isValid) {
      return;
    }
    
    this.isLoading = true;
    this.FPS.forgotPassword(userDetail).then(res => {
      this.isLoading = false;
      console.log("inside submit", res);
      $('.alert.alert-success').show();
      setTimeout(() => {
        $('.alert.alert-success').hide();
        this.route.navigate(['login']);
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
