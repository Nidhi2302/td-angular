import { Injectable } from '@angular/core';
import { AppHttpService } from '../../services/app-http/app-http.service';

@Injectable()
export class SingleDriverOnboardingService {
  baseUrl = "/api/v1/user";
  constructor(private appHttpService: AppHttpService) { }

  importUser = (params: FormData) => {
    return new Promise((resolve, reject) => {
      console.log(params)
      this.appHttpService.postForUplod(this.baseUrl + '/mass-registration', params).subscribe(res => {
        console.log("inside individual-sign-up-service", res);
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

}
