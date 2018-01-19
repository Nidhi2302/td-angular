import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLogsRoutingModule } from './admin-logs-routing.module';
import { AdminLogsComponent } from './admin-logs.component';
import { AdminLogsService } from './admin-logs.service';
import { HistoryService } from '../history/history.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AdminLogsRoutingModule,
    BsDatepickerModule.forRoot(),
    NgxPaginationModule,
    FormsModule
  ],
  declarations: [AdminLogsComponent],
  providers:[AdminLogsService,HistoryService]
})
export class AdminLogsModule { }
