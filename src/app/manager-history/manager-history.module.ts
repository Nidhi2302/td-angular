import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerHistoryRoutingModule } from './manager-history-routing.module';
import { ManagerHistoryComponent } from './manager-history.component';
import { ManagerHistoryService } from './manager-history.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    ManagerHistoryRoutingModule,
    NgxPaginationModule,
    FormsModule
  ],
  declarations: [ManagerHistoryComponent],
  providers:[ManagerHistoryService]
})
export class ManagerHistoryModule { }
