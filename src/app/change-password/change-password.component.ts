import * as md5 from 'js-md5';
import { CustomValidators } from 'ng2-validation';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { ChangePasswordService } from './change-password.service';
import { ValidationService } from '../../services/validation/validation.service';

declare let $: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChangePasswordComponent implements OnInit {
  public isLoading = false;
  public submitted = false;
  currentPassword:boolean=false;
  public changeForm: FormGroup;

  constructor(private CPS: ChangePasswordService, private router: Router, private _fb: FormBuilder, private actRoute: ActivatedRoute) {
    this.changeForm = this._fb.group({
    password: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
    confirmPassword: ['', ValidationService.patternValidation(".*\\S.*")],
    currentPassword: ['', Validators.required]
  }, { validator: ValidationService.checkPasswords });
  }

  ngOnInit() {
  }

  

  changeForms(userDetail, isValid) {
    this.submitted = true;
    if (!isValid) {
        return;
    }

    if(md5(userDetail.currentPassword) !== localStorage.getItem('password')) {
     this.currentPassword=true;
      return;
    }else{
      this.currentPassword=false;
    }

    // if(userDetail.newPassword !== userDetail.confirm) {
    //   $('.confirmPassword').removeClass('sr-only');
    //   return;
    // }

    this.isLoading = true;
    userDetail.userId = this.actRoute.snapshot.params['userId'];
    console.log(userDetail);
    this.CPS.changePassword('/change-password', userDetail).subscribe(res => {
      this.isLoading = false;
      console.log("inside submit", res);
      localStorage.setItem("password",md5(userDetail.password))
      $('.alert.alert-success').show();
      setTimeout(() => {
        $('.alert.alert-success').hide();
      }, 6000);
      this.router.navigate(['/profile'])
		})
  }
}
