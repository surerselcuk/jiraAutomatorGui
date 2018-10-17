import {Injectable} from '@angular/core';
import {IssueModel} from '../app/models/issue-model';
import {HttpHeaders,HttpClient} from '@angular/common/http';
import {Config} from '../config';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';


@Injectable()
export class ScheduleServices {

  constructor(private config:Config , private http: HttpClient,private router:Router) {

  }
  routeUrl (err) {
    if(err.status==401) this.router.navigateByUrl('/login');
  }


  newSchedule (username,password,form) {

    let body=JSON.stringify({'username': username,'password':password,'token':localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token'),'form':form});
    let options={headers:new HttpHeaders({'Content-Type':'application/json'})};

    return this.http.post(this.config.bNewScheduleService,body,options)
      .pipe(catchError((err, caught) =>{this.routeUrl(err); return of(err); } ));
  }

  getSchedules (username,isAdmin) {

    let body=JSON.stringify({'token':localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token'), 'username':username , 'isAdmin': isAdmin});
    let options={headers:new HttpHeaders({'Content-Type':'application/json'})};

    return this.http.post<IssueModel.Schedules[]>(this.config.bGetSchedules,body,options)
      .pipe(catchError((err, caught) =>{this.routeUrl(err); return of(err); } ));

  }

  deleteSchedule (id,username) {

    let body=JSON.stringify({'token':localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token'), 'id':id ,'username':username});
    let options={headers:new HttpHeaders({'Content-Type':'application/json'})};

    return this.http.post(this.config.bDeleteSchedule,body,options)
      .pipe(catchError((err, caught) =>{this.routeUrl(err); return of(err); } ));

  }


}
