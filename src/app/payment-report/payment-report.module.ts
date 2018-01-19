import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentReportRoutingModule } from './payment-report-routing.module';
import { PaymentReportComponent } from './payment-report.component';
import { PaymentReportService } from './payment-report.service';

@NgModule({
	imports: [
		CommonModule,
		PaymentReportRoutingModule
	],
	declarations: [PaymentReportComponent],
	providers: [PaymentReportService]
})
export class PaymentReportModule { }
