import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FindASpaceRoutingModule } from './find-a-space-routing.module';
import { FindASpaceComponent } from './find-a-space.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FindASpaceService } from './find-a-space.service';
import { FindASpaceDetailService } from '../find-a-space-detail/find-a-space-detail.service';

@NgModule({
  imports: [
    CommonModule,
    FindASpaceRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FindASpaceComponent],
  providers:[FindASpaceService,FindASpaceDetailService]
})
export class FindASpaceModule { }
