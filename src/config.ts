import {Injectable} from '@angular/core';

@Injectable()
export class Config {


 appName="JiNNOVA" ;
 loginRememberMeCheck:Boolean=true;

 //Backend Rest Services:
  backendUrl="http://localhost:3000";
  bLoginService=this.backendUrl+"/login";
  bGetAllProjectsService=this.backendUrl+"/rest/getallprojects";
  bGetIssueTypeService=this.backendUrl+"/rest/getissuetypes";
  bGetAllFieldservice=this.backendUrl+"/rest/getallfields";
  bNewScheduleService=this.backendUrl+"/rest/newschedule";
  bUserSearch=this.backendUrl+"/rest/usersearch";
  bGetLogs=this.backendUrl+"/rest/getlogs";
  bGetSchedules=this.backendUrl+"/rest/getsc";
  bVerifyToken=this.backendUrl+"/rest/verifytoken";
  bDeleteSchedule=this.backendUrl+"/rest/delsc";
  bSelectQuery=this.backendUrl+"/rest/squery";
  bJiraSelectQuery=this.backendUrl+"/rest/jquery";

}
