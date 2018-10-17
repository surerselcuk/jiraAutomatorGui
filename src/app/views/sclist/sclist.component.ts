import {AfterViewInit, Component, ElementRef, OnInit, Renderer, Renderer2, ViewChild} from '@angular/core';
import {ScheduleServices} from '../../../services/scheduleServices';
import {SelectItem} from 'primeng/api';
import {IssueModel} from '../../models/issue-model';
import {Router} from '@angular/router';
import {Config} from '../../../config';
import {DTService} from '../../../services/dataTransfer';
import {tsXLXS} from 'ts-xlsx-export';
import {b} from '@angular/core/src/render3';




@Component({
  selector: 'app-sclist',
  templateUrl: './sclist.component.html',
  styleUrls: ['./sclist.component.css']
})



export class SclistComponent implements AfterViewInit {

@ViewChild('statusctrl') statusctrl: ElementRef;
@ViewChild('projectnamectrl') projectnamectrl: ElementRef;



  schedules: IssueModel.Schedules[];
  // xlsData: IssueModel.Schedules[];
  selectedSchedule: IssueModel.Schedules;
  cols: any[];
  status: SelectItem[];

  statusFilter:string="";
  projectFilter:string="";



  username= localStorage.getItem('userName') ? localStorage.getItem('userName') : sessionStorage.getItem('userName');
  isAdmin= localStorage.getItem('isAdmin') ? localStorage.getItem('isAdmin') : sessionStorage.getItem('isAdmin');

  constructor(private scServices: ScheduleServices, private router:Router , private config:Config, private dts: DTService, private renderer: Renderer2){
    this.getScheduleData();
    this.dts.getDashboardStatus().subscribe(data=>this.statusFilter=data);
    this.dts.getDashboardProjectName().subscribe(data=>this.projectFilter=data);
  }

  ngAfterViewInit() {

  //status and projectname filter in dts: clear

    this.dashboardFilter();

  }

  getScheduleData(){
    this.scServices.getSchedules(this.username,this.isAdmin).subscribe(data=>{
      this.schedules=data;
      this.generateTable();

    });
  }

  generateTable (){

    this.cols = [
      {field: 'project_name', header: 'Project Name', width:'10%' },
      {field: 'issue_type_name', header: 'Issue Type', width:'10%' },
      {field: 'summary', header: 'Summary', width:'10%' },
      {field: 'status', header: 'Last Run Status', width:'10%' },
      {field: 'recorder', header: 'User', width:'10%' },
      {field: 'next_run_date', header: 'Next Run', width:'10%' },
      {field: 'sc_description', header: 'Reason', width:'10%' }



    ];


  }


  onRowSelect(event){
    this.dts.setScForm(event.data);
    this.router.navigateByUrl('/editschedule',{ skipLocationChange: true});


  }

  exportXls (){
    let xlsData:any[]=this.schedules;


    for ( let i of xlsData) {
      delete i.form_data;
      delete i.id;
      // delete i.last_run_date;
      // delete i.next_run_date;
      delete i.project_key;
      delete i.week_triger_recur;
      delete i.week_triger_weekday;
      delete i.month_triger_month;
      delete i.month_triger_monthday;
      // delete i.status;



    }

    tsXLXS().exportAsExcelFile(xlsData).saveAsExcelFile("Schedule_List");
  }

  dashboardFilter(){



    if(this.statusFilter.length>0) setTimeout(()=>{
      this.statusctrl.nativeElement.focus();
      this.dts.setDashboardStatus('');
    },100);
    if(this.projectFilter.length>0) setTimeout(()=>{
      this.projectnamectrl.nativeElement.focus();
      this.dts.setDashboardProjectName('');
    },100);


  }

}
