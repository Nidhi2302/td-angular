import { NgModule } from '@angular/core';
import { LaddaModule } from 'angular2-ladda';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordService } from './change-password.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChangePasswordRoutingModule,
    LaddaModule.forRoot({
      spinnerColor: "white",
      spinnerLines: 12
    }),
  ],
  declarations: [ChangePasswordComponent],
  providers: [ChangePasswordService]
})
export class ChangePasswordModule { }
