import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeDriverComponent } from "./home-driver.component";

const routes: Routes = [
  { path: '', component: HomeDriverComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeDriverRoutingModule { }
