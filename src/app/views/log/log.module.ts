import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogRoutingModule } from './log-routing.module';
import { LogComponent } from './log.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CoreServices} from '../../../services/coreServices';
import {Config} from '../../../config';
import {DropdownModule, PanelModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {Router} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    LogRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PanelModule,
    TableModule,
    DropdownModule
  ],
  declarations: [LogComponent],
  providers:[CoreServices,Config]
})
export class LogModule { }
