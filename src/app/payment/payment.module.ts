import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from './payment.service';
import { LaddaModule } from 'angular2-ladda';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaymentRoutingModule,
    LaddaModule.forRoot({
      spinnerColor: "white",
      spinnerLines: 12
    }),
  ],
  declarations: [PaymentComponent],
  providers:[PaymentService]
})
export class PaymentModule { }
