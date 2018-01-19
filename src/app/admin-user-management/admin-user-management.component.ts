import { CommonServiceService } from '../../services/common-service/common-service.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminUserManagementComponent implements OnInit {
  public userList: any=[];
  private baseUrl = "/api/v1/user";

  constructor(protected appSer: CommonServiceService) {}

  ngOnInit() {
    this.appSer.getDriverList(this.baseUrl + '/driver-list?', 'individual').subscribe(data => {
      console.log(data);
      this.userList = data['uData'];
      console.log(this.userList);
    }, err => {
      console.log(err.message);
    });
  }

  getDrivers(enterpriseId) {
    this.userList = [];
    
    this.appSer.getDriverList(this.baseUrl + '/driver-list?enterpriseId=' + enterpriseId+"&&", 'enterprise').subscribe(data => {
      $('.tab-content .tab-pane').hide();
      $('.nav-tabs .nav-link').removeClass('active');
      
      this.userList = data['uData'];
      
      $('.tab-content .tab-pane#enterprise-drivers').show();
      $('.nav-tabs .nav-link.enterprise').addClass('active');
    }, err => {
      $('.tab-content .tab-pane').hide();
      $('.nav-tabs .nav-link').removeClass('active');
      console.log(err.message);
      $('.tab-content .tab-pane#enterprise-drivers').show();
      $('.nav-tabs .nav-link.enterprise').addClass('active');
    });
  }

  adminList(userList) {
    this.userList = [];
    $('.tab-content .tab-pane').hide();

    if(userList != 'managers') {
      $('.tab-content .tab-pane#' + userList + '-drivers').show();
      this.appSer.getDriverList(this.baseUrl + '/driver-list?', userList).subscribe(data => {
        this.userList = data['uData'];
      }, err => {
        console.log(err.message);
      });
    } else {
      $('.tab-content .tab-pane#' + userList).show();
      this.appSer.getManagerList(this.baseUrl + '/manager-list?', userList).subscribe(data => {
        this.userList = data['uData'];
      }, err => {
        console.log(err.message);
      });
    }
  }
}
