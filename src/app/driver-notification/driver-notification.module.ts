import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverNotificationRoutingModule } from './driver-notification-routing.module';
import { DriverNotificationComponent } from './driver-notification.component';
import { DriverNotificationService } from './driver-notification.service';

@NgModule({
  imports: [
    CommonModule,
    DriverNotificationRoutingModule
  ],
  declarations: [DriverNotificationComponent],
  providers: [DriverNotificationService]
})
export class DriverNotificationModule { }
