import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleDriverOnboardingComponent } from "./single-driver-onboarding.component";

const routes: Routes = [
  { path: '', component: SingleDriverOnboardingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleDriverOnboardingRoutingModule { }
