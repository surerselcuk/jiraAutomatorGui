

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IssueModel} from '../app/models/issue-model';
import {Config} from '../config';
import {UserModel} from '../app/models/user-model';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';


@Injectable()
export class JiraInfoServices {
  constructor(private config:Config , private http: HttpClient, private router:Router) {  }

  routeUrl (err) {
    if(err.status==401) this.router.navigateByUrl('/login');
  }

  getAllProjects (username,password) {

    let body=JSON.stringify({'username': username,'password':password,'token':localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')});
    let options={headers:new HttpHeaders({'Content-Type':'application/json'})};

    return this.http.post<IssueModel.Project[]>(this.config.bGetAllProjectsService,body,options)
      .pipe(catchError((err, caught) =>{this.routeUrl(err); return of(err); } ));
  }

  // getIssueTypes (username,password) {
  //
  //   let body=JSON.stringify({'username': username,'password':password,'token': localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')});
  //   let options={headers:new HttpHeaders({'Content-Type':'application/json'})};
  //
  //   return this.http.post<IssueModel.IssueType[]>(this.config.bGetIssueTypeService,body,options)
  //     .pipe(catchError((err, caught) =>{this.routeUrl(err); return of(err); } ));
  // }

  getIssueTypes (projectkey) {

    let query= `select id, pname as name
                      from issuetype
                      where id in (
                          select optionid
                          from optionconfiguration
                          where fieldid='issuetype'
                          and fieldconfig in (
                              select fieldconfigscheme
                              from configurationcontext
                              where customfield='issuetype'
                              and project in (
                                  select id
                                  from project
                                  where pkey = '${projectkey}'
                              )
                          )
                      )
`;

    let body=JSON.stringify({'jquery': query,'token': localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')});
    let options={headers:new HttpHeaders({'Content-Type':'application/json'})};

    return this.http.post<IssueModel.IssueType[]>(this.config.bJiraSelectQuery,body,options)
      .pipe(catchError((err, caught) =>{this.routeUrl(err); return of(err); } ));
  }

  getFields (username,password) {

    let body=JSON.stringify({'username': username,'password':password,'token':localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')});
    let options={headers:new HttpHeaders({'Content-Type':'application/json'})};

    return this.http.post<IssueModel.Field[]>(this.config.bGetAllFieldservice,body,options)
      .pipe(catchError((err, caught) =>{this.routeUrl(err); return of(err); } ));
  }

  userSearch (search,projectkey) {

    let body=JSON.stringify({'search': search,'projectkey':projectkey, 'token':localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')});
    let options={headers:new HttpHeaders({'Content-Type':'application/json'})};

    return this.http.post<UserModel.UserData[]>(this.config.bUserSearch,body,options)
      .pipe(catchError((err, caught) =>{this.routeUrl(err); return of(err); } ));
  }

}
