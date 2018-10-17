import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {CoreModel} from '../app/models/core-models';
import {Config} from '../config';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';


@Injectable()
export class CoreServices {




  constructor(private config:Config , private http: HttpClient, private router:Router) {
  }

  routeUrl (err) {
    if(err.status==401) this.router.navigateByUrl('/login');
     }

  getLogs (){

    let body=JSON.stringify({'token': localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')});
    let options={headers:new HttpHeaders({'Content-Type':'application/json'})};

    return this.http.post<CoreModel.logData[]>(this.config.bGetLogs,body,options)
      .pipe(catchError((err, caught) =>{this.routeUrl(err); return of(err); } ));

  }

  sQuery (squery){

    let body=JSON.stringify({'squery':squery, 'token': localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')});
    let options={headers:new HttpHeaders({'Content-Type':'application/json'})};

    return this.http.post(this.config.bSelectQuery,body,options)
      .pipe(catchError((err, caught) =>{this.routeUrl(err); return of(err); } ));

  }


}
