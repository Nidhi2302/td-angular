import { Injectable } from '@angular/core';
import { AppHttpService } from '../../services/app-http/app-http.service';

@Injectable()
export class TermsConditionService {
  baseUrl = "/api/v1/user";
	constructor(private appHttpService: AppHttpService) { }



}
