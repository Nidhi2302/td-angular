import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHttpService } from '../services/app-http/app-http.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { AdminServiceService } from '../services/admin-service/admin-service.service';
import { CommonServiceService } from '../services/common-service/common-service.service';
import { DriverServiceService } from '../services/driver-service/driver-service.service';
import { ManagerServiceService } from '../services/manager-service/manager-service.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupFlowService } from '../services/signup-flow/signup-flow.service';
import { NotificationService } from '../services/notification/notification.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
      noTokenScheme: true,
      headerName: 'x-auth-token',
      tokenGetter: (() => localStorage.getItem('secret_token'))
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    AppHttpService,
    LocalStorageService,
    AdminServiceService,
    CommonServiceService,
    DriverServiceService,
    ManagerServiceService,
    NotificationService,
    SignupFlowService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
