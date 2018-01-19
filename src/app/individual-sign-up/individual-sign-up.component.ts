import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from './../../services/validation/validation.service';
import { IndividualSignUpService } from './individual-sign-up.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { CommonServiceService } from '../../services/common-service/common-service.service';
import { GeneralService } from '../../services/general/general.service';
declare let $: any;

@Component({
  selector: 'app-individual-sign-up',
  templateUrl: './individual-sign-up.component.html',
  styleUrls: ['./individual-sign-up.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndividualSignUpComponent implements OnInit {
  signupForm: FormGroup;
  subScriptionPlans = ["Monthly", "Quarterly", "Yearly"];
  truckTypes = ["Big", "Small", "3", "4", "5", "6"];
  isFormValid: boolean = false;
  isEmailValid: boolean = false;
  isPhoneValid: boolean = false;
  emailExistsMsg: any;
  phoneExistsMsg: any;
  isLoading = false;
  errMsg;
  selectedPlan;
  selectedPlanPrice;
  stateList=[];
  numberRequire:boolean=false;
  public recaptcha = '';
  public mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  constructor(private fb: FormBuilder, private individualSignUpService: IndividualSignUpService, private route: ActivatedRoute,
    private router: Router, private localStorageService: LocalStorageService,private commonServiceService:CommonServiceService) {
    this.createForm();
    this.changePlan();
    this.stateList = GeneralService.getStates();
  }

  createForm() {
    this.signupForm = this.fb.group({
      firstname: ['', ValidationService.patternValidation(".*\\S.*")],
      lastname: ['', ValidationService.patternValidation(".*\\S.*")],
      username: ['', ValidationService.patternValidation("^[a-zA-Z0-9@.\\-_]*$")],
      cb_radio_handle:['', ValidationService.patternValidation(".*\\S.*")],
      organization: ['',  ValidationService.patternValidation(".*\\S.*")],
      address: ['', ValidationService.patternValidation(".*\\S.*")],
      city: ['', ValidationService.patternValidation(".*\\S.*")],
      state: ['', ValidationService.patternValidation(".*\\S.*")],
      email: ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
      phoneNumber: ['', Validators.compose([Validators.required])],
      truckType: [this.truckTypes[0]],
      truckLength: ['', ValidationService.patternValidation("^[0-9]*$")],
      truckNumber: ['', ValidationService.patternValidation(".*\\S.*")],
      password: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
      confirmPassword: ['', ValidationService.patternValidation(".*\\S.*")],
      plan: [this.subScriptionPlans[0]],
    }, { validator: ValidationService.checkPasswords });
  }
  changePlan(){
    switch(this.signupForm.get("plan").value){
      case "Monthly": this.selectedPlan="$9.99/Month";this.selectedPlanPrice="9.99";break;
      case "Quarterly": this.selectedPlan="$29.99/3 Months";this.selectedPlanPrice="29.99";break;
      case "Yearly": this.selectedPlan="$99.99/Year";this.selectedPlanPrice="99.99";break;
      default:break;
    }
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
        formData["otp"]=res1["otp"];
        formData["userType"]="Individual";
        formData["payment"]=this.selectedPlanPrice;
        sessionStorage.setItem("userInfo", JSON.stringify(formData));
        
        this.router.navigate(["/terms-condition"]);
        this.isLoading = false;        
        $('.alert.alert-success').show();
        setTimeout(() => {
          $('.alert.alert-success').hide();
        }, 6000);
      }).catch(err1 => {
        this.isPhoneValid = true;
        let msg = err1.json();
        this.errMsg = msg;
        this.isLoading = false;        
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
  resolved(captchaResponse: string) {
    this.recaptcha = captchaResponse;
}
}
