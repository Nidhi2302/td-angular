import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetPasswordRoutingModule } from './set-password-routing.module';
import { SetPasswordComponent } from './set-password.component';
import { SetPasswordService } from './set-password.service';
import { LaddaModule } from 'angular2-ladda';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SetPasswordRoutingModule,
    LaddaModule.forRoot({
      spinnerColor: "white",
      spinnerLines: 12
    }),
    ReactiveFormsModule,
  ],
  declarations: [SetPasswordComponent],
  providers: [SetPasswordService]
})
export class SetPasswordModule { }
