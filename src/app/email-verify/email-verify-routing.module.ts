import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailVerifyComponent } from './email-verify.component';

const routes: Routes = [
  { path: ':userId', component: EmailVerifyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailVerifyRoutingModule { }
