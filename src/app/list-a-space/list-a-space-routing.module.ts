import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListASpaceComponent } from "./list-a-space.component";

const routes: Routes = [
   { path: '', component: ListASpaceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListASpaceRoutingModule { }
