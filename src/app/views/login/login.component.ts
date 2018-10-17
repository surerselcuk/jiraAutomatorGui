import {Component,  OnInit } from '@angular/core';
import {Config} from '../../../config';
import {HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { LoginServices } from '../../../services/loginServices';
import {MessageService} from 'primeng/api';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  userName = new FormControl('',Validators.required);
  password = new FormControl('', Validators.required);
  checkRememberMe = new FormControl({value:this.config.loginRememberMeCheck});
  loginErrMessage:string;
  appName:string;

  constructor( private config:Config ,
               private http: HttpClient,
               private router:Router,
               private loginServices:LoginServices,
               private messageService: MessageService,
               private fb: FormBuilder )
  {

    this.formLogin = fb.group({
      userName : this.userName,
      password : this.password,
      checkRememberMe : this.checkRememberMe

    })

    this.appName=this.config.appName;

  }

  ngOnInit(){  }

  loginVerify(){

    this.loginServices.getLogin(this.userName.value,this.password.value)
      .subscribe(data=>{
        if(data.status) {
          this.messageService.add({severity:'success', summary:'Login Passed', detail:"Please wait...", life:8000});

          sessionStorage.setItem("loginStatus","true");
          sessionStorage.setItem('token',data.token);
          sessionStorage.setItem('userName',data.userinfo.name);
          sessionStorage.setItem('password',this.password.value);
          sessionStorage.setItem('emailAddress',data.userinfo.emailAddress);
          sessionStorage.setItem('displayName',data.userinfo.displayName);
          sessionStorage.setItem('avatarUrls',data.userinfo.avatarUrls);
          sessionStorage.setItem('isAdmin',data.isAdmin);

                //rememberMe is Checked
                if(this.checkRememberMe.value) {
                  localStorage.setItem("loginStatus","true");
                  localStorage.setItem('token',data.token);
                  localStorage.setItem('userName',data.userinfo.name);
                  localStorage.setItem('password',this.password.value);
                  localStorage.setItem('emailAddress',data.userinfo.emailAddress);
                  localStorage.setItem('displayName',data.userinfo.displayName);
                  localStorage.setItem('avatarUrls',data.userinfo.avatarUrls);
                  localStorage.setItem('isAdmin',data.isAdmin);
                }
          this.router.navigateByUrl('/');
        }
        else {
          sessionStorage.setItem("loginStatus","false");
          sessionStorage.setItem('token',"");
          this.loginErrMessage=data['message'];
          // this.modalRef = this.modalService.show(this.template);
          this.messageService.add({severity:'error', summary:'Login Failed!', detail:this.loginErrMessage, life:5000});
            console.log(data);

        }
      });

  }

}



