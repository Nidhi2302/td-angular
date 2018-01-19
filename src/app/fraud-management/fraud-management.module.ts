import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FraudManagementRoutingModule } from './fraud-management-routing.module';
import { FraudManagementComponent } from './fraud-management.component';
import { FraudManagementService } from './fraud-management.service'

@NgModule({
	imports: [
		CommonModule,
		FraudManagementRoutingModule
	],
	declarations: [FraudManagementComponent],
	providers: [FraudManagementService]
})
export class FraudManagementModule { }
