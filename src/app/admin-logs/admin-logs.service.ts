import { Injectable } from '@angular/core';
import { AppHttpService } from '../../services/app-http/app-http.service';

@Injectable()
export class AdminLogsService {
  baseUrlList = "/api/v1/list";
  baseUrlBook = "/api/v1/book";
  
  constructor(private appHttpService: AppHttpService) { }
  bookingHistory = (params) => {
    return new Promise((resolve, reject) => {
      this.appHttpService.post(this.baseUrlBook + '/all-booking-history',params, {}, false).subscribe(res => {
        console.log("inside history", res);
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }
  listingHistory = (params) => {
    return new Promise((resolve, reject) => {
      this.appHttpService.post(this.baseUrlList + '/all-listing-history',params, {}, false).subscribe(res => {
        console.log("inside history", res);
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

}
