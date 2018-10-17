

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DTService {


private topMessage = new BehaviorSubject({});
private progressBar = new BehaviorSubject(false);
private scForm = new BehaviorSubject('');

private dashboardProjectName = new BehaviorSubject('');
private dashboardStatus = new BehaviorSubject('');






  constructor() { }

    setTopMessage (MessageObject) { this.topMessage.next(MessageObject); }
    getTopMessage () {return this.topMessage}

    setProgressBar (status) {this.progressBar.next(status);}
    getProgressBar (){return this.progressBar;}

    setScForm (object) {this.scForm.next(object)}
    getScForm (){return this.scForm}

    setDashboardProjectName (projectName) {this.dashboardProjectName.next(projectName)};
    getDashboardProjectName () { return this.dashboardProjectName};
    setDashboardStatus (status) {this.dashboardStatus.next(status)};
    getDashboardStatus () {return this.dashboardStatus};



}
