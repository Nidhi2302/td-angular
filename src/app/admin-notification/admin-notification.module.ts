import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminNotificationRoutingModule } from './admin-notification-routing.module';
import { AdminNotificationComponent } from './admin-notification.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification/notification.service';

@NgModule({
  imports: [
    CommonModule,
    AdminNotificationRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [AdminNotificationComponent],
  providers:[NotificationService]
})
export class AdminNotificationModule { }
