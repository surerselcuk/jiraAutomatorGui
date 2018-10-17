
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewIssueScheduleRoutingModule } from './new-issue-schedule-routing.module';
import {NewIssueScheduleComponent} from './new-issue-schedule.component';
import {InputTextModule} from 'primeng/inputtext';
import {
  AutoCompleteModule, BlockUIModule, ConfirmDialogModule,
  InputTextareaModule, ListboxModule,
  MessageModule,
  MessagesModule, MultiSelectModule,
  PanelModule, ProgressBarModule, ProgressSpinnerModule,
  RadioButtonModule, SpinnerModule
} from 'primeng/primeng';
import {JiraInfoServices} from '../../../services/jiraInfoServices'
import {Config} from '../../../config';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TabViewModule} from 'primeng/primeng';
import {CodeHighlighterModule} from 'primeng/primeng';
import {ObjectKeyPipe} from '../../pipes/object-key.pipe';
import {ScheduleServices} from '../../../services/scheduleServices';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';



@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    NewIssueScheduleRoutingModule,
    AutoCompleteModule,
    TabViewModule,
    CodeHighlighterModule,
    PanelModule,
    InputTextareaModule,
    MessagesModule,
    MessageModule,
    RadioButtonModule,
    SpinnerModule,
    MultiSelectModule,
    MessageModule,
    ToastModule,
    ProgressBarModule,
    BlockUIModule,
    ConfirmDialogModule,
    ProgressSpinnerModule




  ],
  declarations: [NewIssueScheduleComponent, ObjectKeyPipe],
  providers: [JiraInfoServices,Config,ScheduleServices,MessageService]
})
export class NewIssueScheduleModule { }
