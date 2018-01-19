import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindASpaceComponent } from "./find-a-space.component";

const routes: Routes = [
   { path: '', component: FindASpaceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindASpaceRoutingModule { }
