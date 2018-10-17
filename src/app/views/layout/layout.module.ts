import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import {AdminGuard} from '../../../services/adminGuard';
import {Config} from '../../../config';
import {DTService} from '../../../services/dataTransfer';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialogModule, MessageModule, MessagesModule, ProgressBarModule} from 'primeng/primeng';
import {ToastModule} from 'primeng/toast';



@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MessagesModule,
    MessageModule,
    ProgressBarModule,
    ToastModule,
    ConfirmDialogModule


  ],
  declarations: [LayoutComponent],
  providers: [AdminGuard,Config, DTService,MessageService,ConfirmationService]
})
export class LayoutModule { }
