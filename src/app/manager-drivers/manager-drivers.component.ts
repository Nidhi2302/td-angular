import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerDriversService } from './manager-drivers.service';
import { FraudManagementDetailService } from '../fraud-management-detail/fraud-management-detail.service';
declare let $: any;
@Component({
  selector: 'app-manager-drivers',
  templateUrl: './manager-drivers.component.html',
  styleUrls: ['./manager-drivers.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManagerDriversComponent implements OnInit {
 public driversList = [];
  currentPageNumber = 1;
  totalRecord = 0;
  loading: boolean = false;
  driverMaxRecord = 10;
  isLoading: boolean = false;
  errMsg;
  successMsg

  constructor(private managerDriversService: ManagerDriversService, private router: Router,private fraudManagementDetailService:FraudManagementDetailService) {
    this.getDriverList();
  }

  ngOnInit() {
  }

  //pagination
  getPage(event, tab) {
    let pageNumber = parseInt(event);
    this.currentPageNumber = pageNumber;
    this.getDriverList();
  }
  //driver list
  getDriverList() {
    this.loading = true;
    let params = {
      start: this.currentPageNumber,
      maxRecord:this.driverMaxRecord
    }
    this.managerDriversService.driverList(params).then(res => {
      console.log("getDriverList", res);
      this.driversList = res["uData"];
      this.totalRecord = res["totalRecord"];
      this.loading = false;
    }).catch(err => {
      this.loading = false;
    })
  }
  blockUser(record){
    
     this.isLoading=true;
     this.fraudManagementDetailService.blockUser(record._id).then(res=>{
       this.isLoading = false;
       this.successMsg=res;
       record.isBlock=!record.isBlock;
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
   unblockUser(record){
    
     this.isLoading=true;
     this.fraudManagementDetailService.unblockUser(record._id).then(res=>{
       this.isLoading = false;
       record.isBlock=!record.isBlock;
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
