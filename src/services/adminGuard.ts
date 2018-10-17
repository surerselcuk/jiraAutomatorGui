import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {DTService} from './dataTransfer';

@Injectable()
export class AdminGuard implements CanActivate{

  constructor(private router:Router, private dts: DTService) {
  }

  canActivate(){

    if(sessionStorage.getItem('isAdmin')=="true" || localStorage.getItem('isAdmin')=="true" ) {
      return true;
    }
    else {


      this.dts.setTopMessage({severity:'error', summary:'Access Denied', detail:'You are not authorized to access this page! You are redirected to the homepage.'});
      this.router.navigateByUrl('/home',{ skipLocationChange: true});
      return false;
    }

  }


}
