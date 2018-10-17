import { Component, OnInit,ViewChild } from '@angular/core';
import {SclistComponent} from '../sclist/sclist.component';
import {Config} from '../../../config';
import {DTService} from '../../../services/dataTransfer';
import {MessageService} from 'primeng/api';
import {CoreModel} from '../../models/core-models';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {




  username= localStorage.getItem('userName') ? localStorage.getItem('userName') : sessionStorage.getItem('userName');
  displayName= localStorage.getItem('displayName') ? localStorage.getItem('displayName') : sessionStorage.getItem('displayName');
  isAdmin= localStorage.getItem('isAdmin') ? localStorage.getItem('isAdmin') : sessionStorage.getItem('isAdmin');
  avatarUrls= localStorage.getItem('avatarUrls') ? localStorage.getItem('avatarUrls') : sessionStorage.getItem('avatarUrls');

  progressBarStatus=false;

  messageTimeOut=5000;

  sessionLoginStatus=sessionStorage.getItem('loginStatus');
  localLoginStatus=localStorage.getItem('loginStatus');



  constructor(private config: Config, private dts : DTService, private messageService: MessageService) {}


  ngOnInit() {

    this.setTopMessage();
    this.dts.getProgressBar().subscribe(status=>this.progressBarStatus=status)
    // this.dts.getScForm().subscribe(dataa=>console.log("aaaaa"));
  }


  logOut(){
    sessionStorage.clear();
    localStorage.clear();
  }

  setTopMessage (){

    this.dts.getTopMessage().subscribe(message=> {
      this.messageService.clear();
      this.messageTimeOut=this.messageTimeOut+5000;
      this.messageService.add(message);
      setTimeout(()=>this.messageService.clear(),this.messageTimeOut);
    })
  }

  // setTopMessage (){
  //   this.messageService.clear();
  //   this.dts.getTopMessage().subscribe(message=> {
  //     this.messageTimeOut+=10000;
  //     this.messageService.add(message);
  //     setTimeout(()=>this.messageService.clear(),this.messageTimeOut);
  //   })
  // }

  // setTopMessage (){
  //   this.dts.getTopMessage().subscribe(message=> {
  //           this.messageService.add(message);
  //
  //   })
  // }

}
