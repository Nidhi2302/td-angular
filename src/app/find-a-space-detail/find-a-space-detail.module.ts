import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FindASpaceDetailRoutingModule } from './find-a-space-detail-routing.module';
import { FindASpaceDetailComponent } from './find-a-space-detail.component';
import { FindASpaceDetailService } from './find-a-space-detail.service';
import { LaddaModule } from 'angular2-ladda';

@NgModule({
  imports: [
    CommonModule,
    FindASpaceDetailRoutingModule,
    LaddaModule.forRoot({
      spinnerColor: "white",
      spinnerLines: 12
    }),
  ],
  declarations: [FindASpaceDetailComponent],
  providers:[FindASpaceDetailService]
})
export class FindASpaceDetailModule { }
