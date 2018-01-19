import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ListASpaceRoutingModule } from './list-a-space-routing.module';
import { ListASpaceComponent } from './list-a-space.component';
import { ListASpaceService } from './list-a-space.service';
import { LaddaModule } from 'angular2-ladda';


@NgModule({
  imports: [
    CommonModule,
    ListASpaceRoutingModule,
    ReactiveFormsModule,
    LaddaModule.forRoot({
      spinnerColor: "white",
      spinnerLines: 12
    }),
  ],
  declarations: [ListASpaceComponent],
  providers: [ListASpaceService]
})
export class ListASpaceModule { }
