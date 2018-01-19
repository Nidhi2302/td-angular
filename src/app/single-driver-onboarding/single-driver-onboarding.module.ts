import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleDriverOnboardingRoutingModule } from './single-driver-onboarding-routing.module';
import { SingleDriverOnboardingComponent } from './single-driver-onboarding.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { SingleDriverOnboardingService } from './single-driver-onboarding.service';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports: [
    CommonModule,
    SingleDriverOnboardingRoutingModule,
    ReactiveFormsModule,
    LaddaModule.forRoot({
      spinnerColor: "white",
      spinnerLines: 12
    }),
    TextMaskModule
  ],
  declarations: [SingleDriverOnboardingComponent],
  providers:[SingleDriverOnboardingService]
})
export class SingleDriverOnboardingModule {
 
 }
