import { NgModule } from '@angular/core';
import { LaddaModule } from 'angular2-ladda';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';

import { ResetPasswordService } from './reset-password.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ResetPasswordRoutingModule,
    LaddaModule.forRoot({
      spinnerColor: "white",
      spinnerLines: 12
    }),
  ],
  declarations: [ResetPasswordComponent],
  providers: [ResetPasswordService]
})
export class ResetPasswordModule { }
