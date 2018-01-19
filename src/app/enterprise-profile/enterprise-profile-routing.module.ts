import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnterpriseProfileComponent } from './enterprise-profile.component';

const routes: Routes = [
  { path: '', component: EnterpriseProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnterpriseProfileRoutingModule { }
