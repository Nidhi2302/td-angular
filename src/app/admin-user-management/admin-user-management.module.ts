import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUserManagementRoutingModule } from './admin-user-management-routing.module';
import { AdminUserManagementComponent } from './admin-user-management.component';

@NgModule({
  imports: [
    CommonModule,
    AdminUserManagementRoutingModule
  ],
  declarations: [AdminUserManagementComponent]
})
export class AdminUserManagementModule { }
