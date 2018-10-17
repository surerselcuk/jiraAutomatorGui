import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SclistRoutingModule } from './sclist-routing.module';
import { SclistComponent } from './sclist.component';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {ScheduleServices} from '../../../services/scheduleServices';
import {Config} from '../../../config';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  imports: [
    CommonModule,
    SclistRoutingModule,
    PanelModule,
    TableModule,
    HttpClientModule

  ],
  declarations: [SclistComponent],
  providers: [ScheduleServices,Config]
})
export class SclistModule { }
