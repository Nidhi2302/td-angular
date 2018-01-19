import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnterpriseSignUpModule } from "./enterprise-sign-up.module";
import { EnterpriseSignUpComponent } from "./enterprise-sign-up.component";

const routes: Routes = [
    { path: '', component: EnterpriseSignUpComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnterpriseSignUpRoutingModule { }
