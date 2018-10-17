import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SclistComponent} from './sclist.component';

const routes: Routes = [
  {path:'', component: SclistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SclistRoutingModule { }
