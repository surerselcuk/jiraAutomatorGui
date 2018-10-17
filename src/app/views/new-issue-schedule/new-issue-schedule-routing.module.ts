import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewIssueScheduleComponent} from './new-issue-schedule.component';
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


const routes: Routes = [
  {path:'',component:NewIssueScheduleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewIssueScheduleRoutingModule { }
