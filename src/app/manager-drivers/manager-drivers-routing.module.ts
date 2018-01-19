import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerDriversComponent } from './manager-drivers.component';

const routes: Routes = [
  { path: '', component: ManagerDriversComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerDriversRoutingModule { }
