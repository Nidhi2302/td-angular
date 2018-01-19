import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerHistoryComponent } from './manager-history.component';

const routes: Routes = [
  { path: '', component: ManagerHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerHistoryRoutingModule { }
