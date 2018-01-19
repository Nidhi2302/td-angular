import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { HistoryService } from './history.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HistoryRoutingModule,
    BsDatepickerModule.forRoot(),
    NgxPaginationModule,
    FormsModule
  ],
  declarations: [HistoryComponent],
  providers:[HistoryService]
})
export class HistoryModule { }
