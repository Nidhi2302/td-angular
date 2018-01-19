import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindASpaceDetailComponent } from "./find-a-space-detail.component";

const routes: Routes = [
   { path: ':id', component: FindASpaceDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindASpaceDetailRoutingModule { }
