import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtpVerifyRoutingModule } from './otp-verify-routing.module';
import { OtpVerifyComponent } from './otp-verify.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OtpVerifyRoutingModule,
    LaddaModule.forRoot({
      spinnerColor: "white",
      spinnerLines: 12
    }),
  ],
  declarations: [OtpVerifyComponent],

})
export class OtpVerifyModule { }
