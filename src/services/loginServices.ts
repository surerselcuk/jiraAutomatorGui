

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../app/models/user-model';
import {Config} from '../config';


@Injectable()
export class LoginServices {

  constructor(private config:Config , private http: HttpClient) {  }

  getLogin (userName,password) {

      let body=JSON.stringify({'username':userName, 'password':password});
      let options={headers:new HttpHeaders({'Content-Type':'application/json'})};

      return this.http.post<UserModel.LoginData>(this.config.bLoginService,body,options);
  }

  verifyToken (token)  {

    let body=JSON.stringify({'token': token});
    let options={headers:new HttpHeaders({'Content-Type':'application/json'})};

    return this.http.post<UserModel.LoginData>(this.config.bVerifyToken,body,options);
  }

}
