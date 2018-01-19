import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FraudManagementDetailService } from './fraud-management-detail.service';
import { ActivatedRoute } from '@angular/router';

declare let $: any;
@Component({
  selector: 'app-fraud-management-detail',
  templateUrl: './fraud-management-detail.component.html',
  styleUrls: ['./fraud-management-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FraudManagementDetailComponent implements OnInit {
detail={
  reportId:'',
  bookingId:'',
  reportedBy:'',
  againstUser:'',
  role:'',
  brife:''
}
title
reqData;
isBlock:boolean=false;
isLoading:boolean=false;
errMsg;
id;
successMsg
  constructor(private activeRoute: ActivatedRoute,private fraudManagementDetailService:FraudManagementDetailService) {
    this.reqData= this.activeRoute.snapshot.params;
    if (this.reqData.type == 'booking') {
      this.title="Booking ID:"
    }else{
      this.title="Listing ID:"
    }
    this.fraudManagementDetailService.getReportDetail(this.reqData).then(res=>{
      this.detail=res[0];
      this.isBlock=this.detail["isBlock"];
      if (this.reqData.type == 'booking') {
        this.id=this.detail["bookingId"];
      }else{
        this.id=this.detail["listingId"];
      }
    }).catch(err=>{
    })
   }

  ngOnInit() {
  }
  blockUser(){
   
    this.isLoading=true;
    this.fraudManagementDetailService.blockUser(this.detail["againstUserId"]).then(res=>{
      this.isLoading = false;
      this.successMsg=res;
      this.isBlock=!this.isBlock;
			$('.alert.alert-success').show();
			setTimeout(() => {
				$('.alert.alert-success').hide();
			}, 6000);
    }).catch(err=>{
      this.errMsg = err.json();
			this.isLoading = false;
			$('.alert.alert-danger').show();
			setTimeout(() => {
				$('.alert.alert-danger').hide();
			}, 6000);
    })
  }
  unblockUser(){
   
    this.isLoading=true;
    this.fraudManagementDetailService.unblockUser(this.detail["againstUserId"]).then(res=>{
      this.isLoading = false;
      this.isBlock=!this.isBlock;
      this.successMsg=res;
			$('.alert.alert-success').show();
			setTimeout(() => {
				$('.alert.alert-success').hide();
			}, 6000);
    }).catch(err=>{
      this.errMsg = err.json();
			this.isLoading = false;
			$('.alert.alert-danger').show();
			setTimeout(() => {
				$('.alert.alert-danger').hide();
			}, 6000);
    })
  }
}
