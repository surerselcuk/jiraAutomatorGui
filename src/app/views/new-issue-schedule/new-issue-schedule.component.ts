import {Component, OnInit } from '@angular/core';
import {JiraInfoServices} from '../../../services/jiraInfoServices';
import {ScheduleServices} from '../../../services/scheduleServices';
import {IssueModel} from '../../models/issue-model';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService, MessageService} from 'primeng/api';
import {UserModel} from '../../models/user-model';
import {Config} from '../../../config';
import {DTService} from '../../../services/dataTransfer';
import {Route, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {until} from 'selenium-webdriver';
import elementIsDisabled = until.elementIsDisabled;
import {DISABLED} from '@angular/forms/src/model';


@Component({
  selector: 'app-new-issue-schedule',
  templateUrl: './new-issue-schedule.component.html',
  styleUrls: ['./new-issue-schedule.component.css']
})

export class NewIssueScheduleComponent implements OnInit {

  projectFilterData:IssueModel.Project[];
  filteredProject: any[];

  issueTypeFilterData: IssueModel.IssueType[];
  filteredIssueType: any[];

  fieldFilterData: IssueModel.Field[];
  filteredField: any[];

  filteredUsers : UserModel.UserData[];
  selectedUser  : UserModel.UserData;

  formData;
  edidSc:boolean=false;

  formNewSc: FormGroup;

  scId:string;

  days=[];
  months=[];
  monthDays=[];

  trigerType = new FormControl('',Validators.required);


  username=localStorage.getItem('userName') ? localStorage.getItem('userName') : sessionStorage.getItem('userName');
  password=localStorage.getItem('password') ? localStorage.getItem('password') : sessionStorage.getItem('password');

  progress:boolean;

  issueTypeCtrl = new FormControl('',Validators.required );
  projectCtrl = new FormControl('', Validators.required);
  assignCtrl=new FormControl('');

  summaryCtrl=new FormControl('');
  descriptionCtrl=new FormControl('');
  scDescriptonCtrl=new FormControl('',Validators.required);


  dynamicFieldCtrl:FormArray;


  constructor(private jirainfo: JiraInfoServices, private fb:FormBuilder,private router: Router,private confirmationService: ConfirmationService,
              private sc:ScheduleServices, private messageService: MessageService, private config: Config, private dts: DTService) {

    this.days = [
      {label: 'Monday', value: 0},
      {label: 'Tuesday', value: 1},
      {label: 'Wednesday', value: 2},
      {label: 'Thursday', value: 3},
      {label: 'Friday', value: 4},
      {label: 'Saturday', value: 5},
      {label: 'Sunday', value: 6}

    ];
    this.months = [
      {label: 'January', value: 1},
      {label: 'February', value: 2},
      {label: 'March', value: 3},
      {label: 'April', value: 4},
      {label: 'May', value: 5},
      {label: 'June', value: 6},
      {label: 'July', value: 7},
      {label: 'Auqust', value: 8},
      {label: 'September', value: 9},
      {label: 'October', value: 10},
      {label: 'November', value: 11},
      {label: 'December', value: 12}

    ];
    this.monthDays = [
      {label: '1', value: 1},
      {label: '2', value: 2},
      {label: '3', value: 3},
      {label: '4', value: 4},
      {label: '5', value: 5},
      {label: '6', value: 6},
      {label: '7', value: 7},
      {label: '8', value: 8},
      {label: '9', value: 9},
      {label: '10', value: 10},
      {label: '11', value: 11},
      {label: '12', value: 12},
      {label: '13', value: 13},
      {label: '14', value: 14},
      {label: '15', value: 15},
      {label: '16', value: 16},
      {label: '17', value: 17},
      {label: '18', value: 18},
      {label: '19', value: 19},
      {label: '20', value: 20},
      {label: '21', value: 21},
      {label: '21', value: 22},
      {label: '23', value: 23},
      {label: '24', value: 24},
      {label: '25', value: 25},
      {label: '26', value: 26},
      {label: '27', value: 27},
      {label: '28', value: 28},
      {label: '29', value: 29},
      {label: '30', value: 30},
      {label: '31', value: 31},
      {label: 'Last', value: 31}


    ];

    this.dts.getProgressBar().subscribe(data=>this.progress=data);

    this.projectCtrl.disable();
    this.issueTypeCtrl.disable();
    this.assignCtrl.disable();

    this.generateForm();
    this.generateDynamicFields();
    this.dts.getScForm().subscribe(data=>{
      this.formData=data;
      this.formLoad(this.formData);
    }  ).unsubscribe();




  }

  ngOnInit() {

    this.fillFormData();
    this.trigerFormControlValidation();



    setTimeout(()=>{this.projectCtrl.enable()},2000);
    this.projectCtrl.statusChanges.subscribe(data=>{
      if (data=='VALID') {
        this.jirainfo.getIssueTypes(this.projectCtrl.value.key).subscribe(data=>{this.issueTypeFilterData=data;
          // console.log(data);
        });
        setTimeout(()=>{this.issueTypeCtrl.enable()},1000);
        setTimeout(()=>{this.assignCtrl.enable()},2000);
      }
      else {
        this.issueTypeCtrl.setValue('');
        this.issueTypeCtrl.disable();
        this.assignCtrl.disable();
      }
    })


   }

  clearProject(){
    this.projectCtrl.reset();
  }
  clearIssueType(){
    this.issueTypeCtrl.reset();
  }
  clearUser(){
    this.assignCtrl.reset();
  }
  generateForm () {

    this.formNewSc = this.fb.group({
      project         : this.projectCtrl,
      issuetype       : this.issueTypeCtrl,
      assignee        : this.assignCtrl,
      // summary         : [''],
      summary         : this.summaryCtrl,
      // description     : [''],
      description     : this.descriptionCtrl,
      fields          : [''],
      // sc_description   : ['',Validators.required],
      sc_description   : this.scDescriptonCtrl,
      dynamicFields   : this.fb.array([]),
      triger          : this.fb.group( {
        trigerType    : this.trigerType,
        weekTriger    : this.fb.group({
          recur       : ['1'],
          weekDay     : ['']
        }),
        monthTriger    : this.fb.group({
          month       : [''],
          monthDay     : ['']
        })
      }),

    });

  }

  trigerFormControlValidation (){

      const trigerTypeCtrl = this.formNewSc.get('triger').get('trigerType');
      const weekDayCtrl = this.formNewSc.get('triger').get('weekTriger').get('weekDay');
      const monthCtrl = this.formNewSc.get('triger').get('monthTriger').get('month');
      const monthDayCtrl = this.formNewSc.get('triger').get('monthTriger').get('monthDay');

          trigerTypeCtrl.valueChanges.subscribe(data => {
              if(trigerTypeCtrl.value=='week'){
                weekDayCtrl.setValidators([Validators.required]);
                weekDayCtrl.updateValueAndValidity();
              }
              else{
                weekDayCtrl.clearValidators();
                weekDayCtrl.updateValueAndValidity();
              }

              if(trigerTypeCtrl.value=='month'){
                monthCtrl.setValidators([Validators.required]);
                monthDayCtrl.setValidators([Validators.required]);

                monthCtrl.updateValueAndValidity();
                monthDayCtrl.updateValueAndValidity();
              }
              else{
                monthCtrl.clearValidators();
                monthDayCtrl.clearValidators();

                monthCtrl.updateValueAndValidity();
                monthDayCtrl.updateValueAndValidity();
              }

          })

  }

  generateDynamicFields () {

    this.dynamicFieldCtrl= <FormArray>this.formNewSc.controls.dynamicFields;

    this.formNewSc.controls['fields'].valueChanges
      .subscribe(data=>{

        this.dynamicFieldCtrl.controls = [];
        this.dynamicFieldCtrl.reset();
        for(let i of data)  this.dynamicFieldCtrl.push(  this.fb.group( { [i.id]: ['',Validators.required] , name: i.name }) )

      })


  }



  fillFormData() {


    this.jirainfo.getAllProjects(this.username,this.password)
      .subscribe(data => {
          this.projectFilterData=data;

      });

    //getFields
    this.jirainfo.getFields(this.username,this.password)
      .subscribe(data=>this.fieldFilterData=data);


  }


  filterProject(event) {
    let filtered : any[] = [];
    let merge : {};
    let query = event.query;

        for(let i of this.projectFilterData) {
          let project = i.name;
          let key= i.key
              if(project.toLowerCase().match(query.toLowerCase()) || key.toLowerCase().match(query.toLowerCase())) {
                merge={"name":`${i.name} (${i.key})`,"key":i.key};
                filtered.push(merge);
                // console.log(filtered);
              }
        }
    this.filteredProject=filtered;

  }

  filterIssueType(event) {
    let filtered : any[] = [];
    let query = event.query;

    for(let i of this.issueTypeFilterData) {
      let issueType = i.name;
      if(issueType.toLowerCase().match(query.toLowerCase())) {
        filtered.push( i );
        // console.log(filtered);
      }
    }
    this.filteredIssueType=filtered;

  }

  filterField(event) {
    let filtered : any[] = [];
    let query = event.query;

    for(let i of this.fieldFilterData) {
      let field = i.name;
      if(field.toLowerCase().match(query.toLowerCase())) {
        filtered.push(i);
        // console.log(filtered);
      }
    }
    this.filteredField=filtered;

  }

  formSumbit (btn){

    btn.disabled=true;
    this.dts.setProgressBar(true);
    this.summaryCtrl.setValue(this.summaryCtrl.value.replace(/[-\/\\^$*+?.()|[\]{}'"]/g,' '));
    this.descriptionCtrl.setValue(this.descriptionCtrl.value.replace(/[-\/\\^$*+?.()|[\]{}'"]/g,' '));
    this.scDescriptonCtrl.setValue(this.scDescriptonCtrl.value.replace(/[-\/\\^$*+?.()|[\]{}'"]/g,' '));

    //newSchedule
    this.sc.newSchedule(this.username,this.password,this.formNewSc.value)
      .subscribe(data=>{
        let a=JSON.parse(JSON.stringify(data));
        console.log(data);
        btn.disabled=false;
        this.dts.setProgressBar(false);

        this.dts.setTopMessage({severity:a.status==true?'success':'warn', summary:a.status==true?'Success':'Warn', detail:a.status==true?'Issue automation is save':JSON.stringify(a.messages)});

        // if(a.status)this.formReset();

        if(a.status){
          if(this.edidSc==true) this.sc.deleteSchedule(this.scId,this.username).subscribe();
          this.edidSc=false;
          setTimeout(()=>{this.router.navigateByUrl('sclist',{ skipLocationChange: true});},500);
        }


      });



  }

  filterUsers(event) {
    let filtered : any[] = [];
    let query = event.query.toLowerCase();

    //getAllProjects
    this.jirainfo.userSearch(query,this.projectCtrl.value.key)
      .subscribe(data =>this.filteredUsers=data);

  }

  formReset(){
    let formResetValue={ "project": "", "issuetype": "", "assignee": "", "summary": "", "description": "", "sc_description":"", "fields": "", "dynamicFields": [], "triger": { "trigerType": "", "weekTriger": { "recur": "1", "weekDay": "" }, "monthTriger": { "month": "", "monthDay": "" } } };
    this.formNewSc.setValue(formResetValue);
  }

  formLoad(data){

    if (data==='') {

    }
    else {
      setTimeout(()=>{
        this.formNewSc.setValue(JSON.parse(data.form_data));
        this.dts.setScForm('');
        this.edidSc=true;
        this.scId=JSON.parse(data.id);

      },500)
    }

  }

  scDelete(){

    this.confirmationService.confirm({
      message: 'Are you sure delete?',
      accept: () => {
        this.sc.deleteSchedule(this.scId , this.username).subscribe(a=>{
          this.dts.setTopMessage({severity:a.status?'success':'error', summary:a.status?'Success':'Error', detail:a.status?'Schedule deleted':JSON.stringify(a.messages)});
          if(a.status) this.router.navigateByUrl('sclist',{ skipLocationChange: true});
          console.log(a.status);

        });
      }
    });





  }


  scCancel(){
    this.router.navigateByUrl('sclist',{ skipLocationChange: true});
  }

}

