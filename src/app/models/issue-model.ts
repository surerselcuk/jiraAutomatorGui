import {s} from '@angular/core/src/render3';

export namespace IssueModel {


  export interface Project {

    id: string;
    key: string;
    name: string;

  }

  export interface IssueType {

    id: string;
    name: string;
    description: string;

  }

  export interface Field {

    id: string;
    name: string;
    custom: boolean;
    orderable: boolean;
    navigable: boolean;
    searchable: boolean;
    clauseNames: string[];
    schema: {
      type: string;
    }


  }

  export interface Schedules {

    id: string,
    project_name  : string,
    project_key  : string,
    issue_type_name  : string,
    summary : string,
    description  : string,
    triger_type : string,
    week_triger_recur : string,
    week_triger_weekday  : string,
    month_triger_month  : string,
    month_triger_monthday : string,
    recorder : string,
    ecord_date : string,
    status: string,
    form_data: string,
    last_run_date : string,
    next_run_date : string,
    sc_description: string





  }

}

