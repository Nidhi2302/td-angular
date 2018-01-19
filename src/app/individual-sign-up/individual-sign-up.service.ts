import { Injectable } from '@angular/core';
import { AppHttpService } from '../../services/app-http/app-http.service';
import { Observable } from 'rxjs/Observable';
import { resolve, reject } from 'q';

@Injectable()
export class IndividualSignUpService {
  baseUrl = "/api/v1/user";
  constructor(private appHttpService: AppHttpService) { }

  
 
 
}
