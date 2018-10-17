import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIssueScheduleComponent } from './new-issue-schedule.component';

describe('NewIssueScheduleComponent', () => {
  let component: NewIssueScheduleComponent;
  let fixture: ComponentFixture<NewIssueScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIssueScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIssueScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
