import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLogsComponent } from './admin-logs.component';

const routes: Routes = [
  { path: '', component: AdminLogsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLogsRoutingModule { }
