import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FraudManagementDetailComponent } from './fraud-management-detail.component';

const routes: Routes = [
  { path: ':type/:id', component: FraudManagementDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FraudManagementDetailRoutingModule { }
