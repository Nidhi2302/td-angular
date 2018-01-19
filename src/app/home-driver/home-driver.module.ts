import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeDriverRoutingModule } from './home-driver-routing.module';
import { HomeDriverComponent } from './home-driver.component';

@NgModule({
  imports: [
    CommonModule,
    HomeDriverRoutingModule
  ],
  declarations: [HomeDriverComponent]
})
export class HomeDriverModule { }
