import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TermsConditionService } from './terms-condition.service';
import { CommonServiceService } from '../../services/common-service/common-service.service';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TermsConditionComponent implements OnInit {
userinfo:any={}
userId
  constructor(private router: Router,private termsConditionService:TermsConditionService,private commonServiceService:CommonServiceService) {
    
   }

  ngOnInit() {
    window.scrollTo(0, 0)
  }

  accept(){
    this.userinfo=JSON.parse(sessionStorage.getItem("userInfo"));
    this.userId=sessionStorage.getItem("userId");
    console.log(this.userId,this.userinfo);
    if(this.userId!='' && this.userId !=null ){
      //call api
        console.log("inside res");
        this.commonServiceService.otp({ "phoneNumber": this.userinfo["phoneNumber"],"used":true }).then(res1 => {
          this.userinfo["otp"]=res1['otp'];
          sessionStorage.setItem("userInfo",JSON.stringify(this.userinfo));
          this.router.navigate(["/otp-verify"]);   
        }).catch(err1=>{
          console.log("inside otp err",err1);  
        })
        
      
    }
    else{
      this.userinfo["isAgreementSign"]=true;
      sessionStorage.setItem("userInfo",JSON.stringify(this.userinfo));
      this.router.navigate(["/otp-verify"]);
    }
  }
  decline(){
    this.router.navigate(["/"])
  }
}
