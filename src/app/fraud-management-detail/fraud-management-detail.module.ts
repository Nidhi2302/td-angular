import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FraudManagementDetailRoutingModule } from './fraud-management-detail-routing.module';
import { FraudManagementDetailComponent } from './fraud-management-detail.component';
import { LaddaModule } from 'angular2-ladda';
import { FraudManagementDetailService } from './fraud-management-detail.service';

@NgModule({
  imports: [
    CommonModule,
    FraudManagementDetailRoutingModule,
    LaddaModule.forRoot({
      spinnerColor: "white",
      spinnerLines: 12
    }),
    
  ],
  declarations: [FraudManagementDetailComponent],
  providers:[FraudManagementDetailService]
})
export class FraudManagementDetailModule { }
