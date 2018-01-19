import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverStatusComponent } from './driver-status.component';

const routes: Routes = [
  { path: '', component: DriverStatusComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverStatusRoutingModule { }
