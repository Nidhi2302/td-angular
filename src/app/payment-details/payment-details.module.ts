import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentDetailsRoutingModule } from './payment-details-routing.module';
import { PaymentDetailsComponent } from './payment-details.component';
import { PaymentDetailsService } from './payment-details.service';

@NgModule({
	imports: [
		CommonModule,
		PaymentDetailsRoutingModule
	],
	declarations: [PaymentDetailsComponent],
	providers: [PaymentDetailsService]
})
export class PaymentDetailsModule { }
