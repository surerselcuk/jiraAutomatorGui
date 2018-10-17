import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Config} from '../../../config';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import {LoginServices} from '../../../services/loginServices';

import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {MessageModule} from 'primeng/message';
import {InputSwitchModule} from 'primeng/primeng';



@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    InputTextModule,
    ToastModule,
    MessageModule,
    InputSwitchModule



  ],
  declarations: [LoginComponent],
  providers: [Config,LoginServices,MessageService],
})
export class LoginModule { }
