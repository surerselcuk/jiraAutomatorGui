import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginGuard} from '../services/loginGuard';

const routes: Routes = [
  {path: 'login', loadChildren: './views/login/login.module#LoginModule'},
  {path: '', loadChildren: './views/layout/layout.module#LayoutModule', canActivate:[LoginGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
