import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUserManagementComponent } from "./admin-user-management.component";

const routes: Routes = [
  { path: '', component: AdminUserManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUserManagementRoutingModule { }
