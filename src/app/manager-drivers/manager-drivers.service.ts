import { Injectable } from '@angular/core';
import { AppHttpService } from '../../services/app-http/app-http.service';

@Injectable()
export class ManagerDriversService {
  baseUrl = "/api/v1/user";
  
  constructor(private appHttpService: AppHttpService) { }
  driverList = (params) => {
    return new Promise((resolve, reject) => {
      this.appHttpService.post(this.baseUrl + '/manager-driver-list',params, {}, false).subscribe(res => {
        console.log("inside driverList", res);
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

}
