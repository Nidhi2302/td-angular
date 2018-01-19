import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { CommonServiceService } from '../../services/common-service/common-service.service';
import { ValidationService } from '../../services/validation/validation.service';
import { forEach } from '@angular/router/src/utils/collection';
import { GeneralService } from '../../services/general/general.service';
declare let $: any;

@Component({
  selector: 'app-enterprise-sign-up',
  templateUrl: './enterprise-sign-up.component.html',
  styleUrls: ['./enterprise-sign-up.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EnterpriseSignUpComponent implements OnInit {
  plans = [
    {
      name: "Plan 1",
      count: "50",
      price: "5"
    },
    {
      name: "Plan 2",
      count: "100",
      price: "10"
    },
    {
      name: "Plan 3",
      count: "150",
      price: "15"
    },
    {
      name: "Plan 4",
      count: "200",
      price: "20"
    }
  ]
  subScriptionPlans = [
    {
      name: "Monthly",
      multiply: 1,
      price: 9.99
    },
    {
      name: "Quarterly",
      multiply: 3,
      price: 29.99
    },
    {
      name: "Yearly",
      multiply: 12,
      price: 99.99
    }];
  isEmailValid: boolean = false;
  isPhoneValid: boolean = false;
  isLoading: boolean = false;
  emailExistsMsg: any;
  phoneExistsMsg: any;
  signupForm: FormGroup;
  actualPrice;
  selectedPlan = "";
  selectedPlanPrice;
  errMsg;
  userCount;
  stateList = [];
  public recaptcha = '';
  numberRequire:boolean=false;
  public mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private localStorageService: LocalStorageService, private commonServiceService: CommonServiceService) {
    this.signupForm = this.fb.group({
      firstname: ['', ValidationService.patternValidation(".*\\S.*")],
      lastname: ['', ValidationService.patternValidation(".*\\S.*")],
      organization: ['', ValidationService.patternValidation(".*\\S.*")],
      address: ['', ValidationService.patternValidation(".*\\S.*")],
      city: ['', ValidationService.patternValidation(".*\\S.*")],
      state: ['', ValidationService.patternValidation(".*\\S.*")],
      email: ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
      phoneNumber: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
      confirmPassword: ['', ValidationService.patternValidation(".*\\S.*")],
      subScriptionPlan: [this.subScriptionPlans[0].name],
      plan: [this.plans[0].price]
    }, { validator: ValidationService.checkPasswords });
    this.stateList = GeneralService.getStates();
  }

  ngOnInit() {
    //this.planChange()
  }
  // planChange(){
  //  for(let i=0; i<3;i++){
  //    this.subScriptionPlans[i].price=(this.signupForm.get("plan").value * this.subScriptionPlans[i].multiply);
  //  }
  // }

  submit(formData: any) {
    this.isLoading = true;
    console.log(formData);
    let phoneNumber= formData.phoneNumber.replace(/\D+/g, '');
    if(phoneNumber==''||phoneNumber==null){
      this.numberRequire=true;
      this.isLoading = false;
      return;
    }else{
      this.numberRequire=false;
    }

    switch (this.signupForm.get("plan").value) {
      case "5": this.selectedPlan = "plan1_" + this.signupForm.get("subScriptionPlan").value;
        this.userCount = 50;
        break;
      case "10": this.selectedPlan = "plan2_" + this.signupForm.get("subScriptionPlan").value;
        this.userCount = 100;
        break;
      case "15": this.selectedPlan = "plan3_" + this.signupForm.get("subScriptionPlan").value;
        this.userCount = 150;
        break;
      case "20": this.selectedPlan = "plan4_" + this.signupForm.get("subScriptionPlan").value;
        this.userCount = 200;
        break;
      default: break;
    }
    for (let i = 0; i < 3; i++) {
      if (this.signupForm.get("subScriptionPlan").value == this.subScriptionPlans[i].name) {
        this.selectedPlanPrice = this.subScriptionPlans[i].price;
      }

    }
    // this.subScriptionPlans

    this.commonServiceService.emailExists({ "email": formData.email }).then(res => {
      console.log("inside submit", res);
      this.isEmailValid = false;
      
      console.log("pghonenumber", phoneNumber);
      this.commonServiceService.otp({ "phoneNumber":phoneNumber }).then(res1 => {
        console.log("inside submit", phoneNumber);
        this.isPhoneValid = false;
        formData["otp"] = res1["otp"];
        formData["plan"] = this.selectedPlan;
        formData["payment"] = this.selectedPlanPrice;
        formData["userType"] = "Enterprise";
        formData["userCount"] = this.userCount;
        sessionStorage.setItem("userInfo", JSON.stringify(formData));
        this.isLoading = false;
        this.router.navigate(["/terms-condition"]);
        $('.alert.alert-success').show();
        setTimeout(() => {
          $('.alert.alert-success').hide();
        }, 6000);
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
  }
  resolved(captchaResponse: string) {
    this.recaptcha = captchaResponse;
}
}
