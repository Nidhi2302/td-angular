import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { LaddaModule } from 'angular2-ladda';
import { ReportService } from './report.service';

@NgModule({
  imports: [
    CommonModule,
    ReportRoutingModule,
    ReactiveFormsModule,
    LaddaModule
  ],
  declarations: [ReportComponent],
  providers: [ReportService]
})
export class ReportModule { }
