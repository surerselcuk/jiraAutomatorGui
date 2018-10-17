import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout.component';
import {AdminGuard} from '../../../services/adminGuard';


const routes: Routes = [
  {path:'', component: LayoutComponent,
    children: [
      {path:'newschedule' ,loadChildren:'../new-issue-schedule/new-issue-schedule.module#NewIssueScheduleModule'},
      {path:'editschedule' ,loadChildren:'../new-issue-schedule/new-issue-schedule.module#NewIssueScheduleModule'},
      {path:'log', loadChildren:'../log/log.module#LogModule', canActivate:[AdminGuard]},
      {path:'home' ,loadChildren:'../home/home.module#HomeModule'},
      {path:'' ,loadChildren:'../home/home.module#HomeModule'},
      {path:'sclist' ,loadChildren:'../sclist/sclist.module#SclistModule'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
