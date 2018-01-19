import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverNotificationComponent } from './driver-notification.component';

const routes: Routes = [
  {path: '', component: DriverNotificationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverNotificationRoutingModule { }
