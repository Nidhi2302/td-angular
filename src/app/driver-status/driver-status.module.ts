import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverStatusRoutingModule } from './driver-status-routing.module';
import { DriverStatusComponent } from './driver-status.component';
import { DriverStatusService } from './driver-status.service';


@NgModule({
  imports: [
    CommonModule,
    DriverStatusRoutingModule
  ],
  declarations: [DriverStatusComponent],
  providers:[DriverStatusService]
})
export class DriverStatusModule { }
