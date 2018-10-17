import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {CardModule, ChartModule, MessageModule, MessageService, MessagesModule} from 'primeng/primeng';
import {CoreServices} from '../../../services/coreServices';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MessagesModule,
    MessageModule,
    CardModule,
    ChartModule
  ],
  declarations: [HomeComponent],
  providers: [MessageService,CoreServices]
})
export class HomeModule { }
