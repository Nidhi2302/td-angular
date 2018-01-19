import { Injectable } from '@angular/core';
import { AppHttpService } from '../../services/app-http/app-http.service';

@Injectable()
export class FindASpaceDetailService {
  baseUrlList = "/api/v1/list";
  baseUrlBook = "/api/v1/book";
  
  constructor(private appHttpService: AppHttpService) { }

  getDetails= (params) => {
		return new Promise((resolve, reject) => {
			 this.appHttpService.get(this.baseUrlList + '/find-a-space-detail/'+params, {}, false).subscribe(res => {
				console.log("inside find a space detail", res);
				resolve(res);
			}, err => {
				reject(err);
			}) 
		})
  }
  bookSapce= (params) => {
	return new Promise((resolve, reject) => {
		 this.appHttpService.post(this.baseUrlBook + '/book-a-space',params, {}, false).subscribe(res => {
			console.log("inside find a space detail", res);
			resolve(res);
		}, err => {
			reject(err);
		}) 
	})
}
}
