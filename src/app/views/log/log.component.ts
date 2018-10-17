import { Component, OnInit } from '@angular/core';
import {CoreServices} from '../../../services/coreServices';
import {CoreModel} from '../../models/core-models';
import {SelectItem} from 'primeng/api';
import {Router} from '@angular/router';



@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  logs: CoreModel.logData[];
  cols: any[];
  status: SelectItem[];


  constructor(private coreServices: CoreServices, private router:Router) {
    // this.coreServices.getLogs().subscribe(data=>{
    //   this.logs=data;
    //   this.generateTable();
    // });

    this.coreServices.getLogs().subscribe(data=>{
      this.logs=data;
      this.generateTable();
    }
    );


  }

  ngOnInit() {
  }

  generateTable (){

    this.cols = [
      {field: 'date', header: 'Date', width:'10%' },
      {field: 'status', header: 'Status', width:'10%' },
      {field: 'user', header: 'User', width:'10%' },
      {field: 'subject', header: 'Subject' , width:'10%'},
      {field: 'log', header: 'Log', width:'60%' }

    ];

    this.status=[
      { label: 'All', value: null },
      { label: 'Success', value: 'success' },
      { label: 'Fail', value: 'fail' }
    ];


  }

}
