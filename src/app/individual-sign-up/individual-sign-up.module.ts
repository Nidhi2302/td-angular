import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndividualSignUpRoutingModule } from './individual-sign-up-routing.module';
import { IndividualSignUpComponent } from './individual-sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IndividualSignUpService } from './individual-sign-up.service';
import { LaddaModule } from 'angular2-ladda';
import { TextMaskModule } from 'angular2-text-mask';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  imports: [
    CommonModule,
    IndividualSignUpRoutingModule,
    ReactiveFormsModule,
    LaddaModule.forRoot({
      spinnerColor: "white",
      spinnerLines: 12
    }),
    TextMaskModule,
    RecaptchaModule.forRoot()
  ],
  declarations: [IndividualSignUpComponent],
  providers:[IndividualSignUpService]
})
export class IndividualSignUpModule { }
