import { NgModule } from '@angular/core';
import { LaddaModule } from 'angular2-ladda';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';

import { ForgotPasswordService } from './forgot-password.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ForgotPasswordRoutingModule,
    LaddaModule.forRoot({
      spinnerColor: "white",
      spinnerLines: 12
    }),
  ],
  declarations: [ForgotPasswordComponent],
  providers: [ForgotPasswordService]
})
export class ForgotPasswordModule { }
