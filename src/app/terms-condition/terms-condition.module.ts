import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsConditionRoutingModule } from './terms-condition-routing.module';
import { TermsConditionComponent } from './terms-condition.component';
import { TermsConditionService } from './terms-condition.service';

@NgModule({
  imports: [
    CommonModule,
    TermsConditionRoutingModule
  ],
  declarations: [TermsConditionComponent],
  providers:[TermsConditionService]
})
export class TermsConditionModule { }
