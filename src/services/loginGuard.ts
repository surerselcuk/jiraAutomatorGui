import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LoginServices} from './loginServices';
import {subscribeToPromise} from 'rxjs/internal-compatibility';
import {Observable} from 'rxjs';
import {b} from '@angular/core/src/render3';
import {reject} from 'q';

@Injectable()
export class LoginGuard implements CanActivate {

  // this.loginService.verifyToken(localStorage.getItem('token')).subscribe(data=>data.status)

  constructor(private router: Router, private loginService: LoginServices) {


  }

  canActivate(){

    if(sessionStorage.getItem('loginStatus')=="true" || localStorage.getItem('loginStatus')=="true" ) {
      return true;
    }
    else {
      sessionStorage.clear();
      localStorage.clear();
      this.router.navigateByUrl('/login',{ skipLocationChange: true});
      return false;
    }

  }


} // class end
