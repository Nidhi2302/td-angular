import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ValidationService } from '../../services/validation/validation.service';
import { CommonServiceService } from '../../services/common-service/common-service.service';



declare let $: any;

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OtpVerifyComponent implements OnInit {
  userInfo = {};
  phoneNum;
  digit1;
  digit2;
  digit3;
  digit4;
  otpInvalid: boolean = false;
  isPhoneValid: boolean = false;
  minCount: boolean = false;
  otpInvalidMsg;
  phoneExistsMsg;
  phoneNumForm: FormGroup;
  userId
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private localStorageService: LocalStorageService, private commonServiceService: CommonServiceService) {
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    this.minCount = true;
    setTimeout(() => { this.minCount = false; }, 60000);//set to 1 min after testing
    this.phoneNumForm = this.fb.group({
      phoneNumber: ['', Validators.compose([Validators.required, ValidationService.mobileNumberValidator])],
    })

  }

  ngOnInit() {
  }
  verifyOTP() {
    let enteredOTP = this.digit1 + this.digit2 + this.digit3 + this.digit4;
    console.log(enteredOTP);

    if (enteredOTP == this.userInfo["otp"]) {
      this.otpInvalid = false;
      this.userId=sessionStorage.getItem("userId");
      console.log(this.userId,this.userInfo);
      if(this.userId!='' && this.userId !=null ){
        //call api
        let params={
          checkedOtp:enteredOTP,
          userId:this.userId
        }
        this.commonServiceService.signAgreement(params).then(res=>{
          localStorage.setItem('secret_token', res['secteteToken']);
          localStorage.setItem('userType', res['uData'][0]['userType']);
          localStorage.setItem('name', res['uData'][0]['name']);
          localStorage.setItem('username', res['uData'][0]['username']);
          localStorage.setItem('id', res['uData'][0]['_id']);
          localStorage.setItem('home', 'home-driver');
          this.router.navigate(["home-driver"]);
        }).catch(err=>{

        })
      }else{
        this.router.navigate(["/payment"]);
      }
      
    } else {
      this.otpInvalid = true;
      this.otpInvalidMsg = "OTP invalid";
    }

  }
  autoTab(ev, field) {

    if (ev.srcElement.form.elements[field]) {
      if(ev.keyCode!=8){
        ev.srcElement.form.elements[field].focus();
      }
     
    }
    else {
      console.log('close keyboard');
    }
  }
  changeNum(text) {
    let phonenumber;
    if (text == "num") {
      phonenumber = this.phoneNumForm.get("phoneNumber").value;
      this.userInfo["phoneNumber"] = this.phoneNumForm.get("phoneNumber").value;
    }
    else {
      phonenumber = this.userInfo["phoneNumber"]
    }
    console.log(this.phoneNum);
    let phoneNumber= phonenumber.replace(/\D+/g, '');
    console.log("Phone number",phoneNumber);
    this.commonServiceService.otp({ "phoneNumber": phoneNumber }).then(res1 => {
      console.log("inside submit", res1);
      this.isPhoneValid = false;
      this.userInfo["otp"] = res1["otp"];
      sessionStorage.setItem("userInfo", JSON.stringify(this.userInfo));
      $('.alert.alert-success').show();
      setTimeout(() => {
        $('.alert.alert-success').hide();
      }, 6000);

    }).catch(err1 => {
      this.isPhoneValid = true;
      let msg = err1.json();
      this.phoneExistsMsg = msg;
      $('.alert.alert-danger').show();
      setTimeout(() => {
        $('.alert.alert-danger').hide();
      }, 6000);
    })

  }
}
