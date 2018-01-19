import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnterpriseSignUpRoutingModule } from './enterprise-sign-up-routing.module';
import { EnterpriseSignUpComponent } from './enterprise-sign-up.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { TextMaskModule } from 'angular2-text-mask';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  imports: [
    CommonModule,
    EnterpriseSignUpRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    LaddaModule.forRoot({
      spinnerColor: "white",
      spinnerLines: 12
    }),
    TextMaskModule,
    RecaptchaModule.forRoot()
  ],
  declarations: [EnterpriseSignUpComponent]
})
export class EnterpriseSignUpModule { }
