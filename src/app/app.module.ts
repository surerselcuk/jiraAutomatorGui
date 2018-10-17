import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LoginGuard} from '../services/loginGuard';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginServices} from '../services/loginServices';
import {Config} from '../config';
import {HttpClientModule} from '@angular/common/http';


// import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent


  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
    // FormsModule,

  ],
  providers: [LoginGuard,LoginServices,Config],
  bootstrap: [AppComponent]
})
export class AppModule { }
