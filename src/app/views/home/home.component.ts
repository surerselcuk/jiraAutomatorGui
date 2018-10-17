import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {CoreServices} from '../../../services/coreServices';
import {b} from '@angular/core/src/render3';
import {DTService} from '../../../services/dataTransfer';
import {Router} from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  g1data={};
  g1data_label=[];
  g1data_var=[];
  g1data_query:string;
  g1Visible:boolean=true;

  g2data={};
  g2data_label=[];
  g2data_var=[];
  g2data_query:string;
  g2Visible:boolean=true;

  username=localStorage.getItem('userName') ? localStorage.getItem('userName') : sessionStorage.getItem('userName');



  constructor(private messageService: MessageService, private cs: CoreServices, private dts: DTService, private router:Router) {

    this.g1data_query="select status,count(*) as total from schedule where is_Deleted='false'";
    this.g1data_query+=(localStorage.getItem('isAdmin')=='true' || sessionStorage.getItem('isAdmin')=='true' ) ? "" : "and recorder='" +this.username+"' ";
    this.g1data_query+=" group by status";

    this.g2data_query="select project_key, count(*) as total from schedule where is_Deleted='false' ";
    this.g2data_query+=(localStorage.getItem('isAdmin')=='true' || sessionStorage.getItem('isAdmin')=='true' ) ? "" : "and recorder='" +this.username+"' ";
    this.g2data_query+="  group by project_key";

    cs.sQuery(this.g1data_query).subscribe(data=>{

      if (data.status==true && data.results.length>0 ) {
        this.g1Visible=true;
        for(let i of data.results) {
          this.g1data_label.push(i.status);
          this.g1data_var.push(i.total);
        }

        this.generateGrafic1(this.g1data_label,this.g1data_var);
      }
      else {
        this.g1Visible=false;
      }

    });

    cs.sQuery(this.g2data_query).subscribe(data=>{

      if (data.status==true && data.results.length>0 ) {
        this.g2Visible=true;
        for(let i of data.results) {
          this.g2data_label.push(i.project_key);
          this.g2data_var.push(i.total);
        }

        this.generateGrafic2(this.g2data_label,this.g2data_var);
      }
      else {
        this.g2Visible=false;
      }

    });

  }

  ngOnInit() {
    this.dts.setDashboardStatus("");
  }

  generateGrafic1 (label,value){

    this.g1data = {
      labels: label,
      datasets: [
        {
          data: value,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#adff2f",
            "#5f5bea",
            "#c52c13",
            "#27510f",
            "#12f7af",
            "#7112f7",
            "#d712f7",
            "#f712a5",
            "#b64155"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#adff2f",
            "#5f5bea",
            "#c52c13",
            "#27510f",
            "#12f7af",
            "#7112f7",
            "#d712f7",
            "#f712a5",
            "#b64155"
          ]
        }]

    }




  }
  generateGrafic2 (label,value){

    this.g2data = {
      labels: label,
      datasets: [
        {
          data: value,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#adff2f",
            "#5f5bea",
            "#c52c13",
            "#27510f",
            "#12f7af",
            "#7112f7",
            "#d712f7",
            "#f712a5",
            "#b64155",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#adff2f",
            "#5f5bea",
            "#c52c13",
            "#27510f",
            "#12f7af",
            "#7112f7",
            "#d712f7",
            "#f712a5",
            "#b64155",

          ]
        }]

    }




  }

  selectStatus(event){
    // console.log(event.dataset);
    // console.log(event.dataset);
    // console.log(event.element);
    // console.log(event.element._datasetIndex);
    // console.log(this.g1data_label[event.element._index] );
    this.dts.setDashboardStatus(this.g1data_label[event.element._index]);
    this.router.navigateByUrl('/sclist',{ skipLocationChange: true});

  }

  selectProject(event){

    // console.log(event.dataset);
    // console.log(event.dataset);
    // console.log(event.element);
    // console.log(event.element._datasetIndex);
    // console.log(this.g1data_label[event.element._index] );

    this.dts.setDashboardProjectName(this.g2data_label[event.element._index]);
    this.router.navigateByUrl('/sclist',{ skipLocationChange: true});

  }



}
