import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FraudManagementComponent } from './fraud-management.component';

const routes: Routes = [
	{ path: '', component: FraudManagementComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FraudManagementRoutingModule { }
