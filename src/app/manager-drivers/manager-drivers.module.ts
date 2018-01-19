import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerDriversRoutingModule } from './manager-drivers-routing.module';
import { ManagerDriversComponent } from './manager-drivers.component';
import { ManagerDriversService } from './manager-drivers.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FraudManagementDetailService } from '../fraud-management-detail/fraud-management-detail.service';

@NgModule({
  imports: [
    CommonModule,
    ManagerDriversRoutingModule,
    NgxPaginationModule,
    FormsModule
  ],
  declarations: [ManagerDriversComponent],
  providers:[ManagerDriversService,FraudManagementDetailService]
})
export class ManagerDriversModule { }
