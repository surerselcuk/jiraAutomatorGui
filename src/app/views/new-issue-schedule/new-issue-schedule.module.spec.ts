import { NewIssueScheduleModule } from './new-issue-schedule.module';

describe('NewIssueScheduleModule', () => {
  let newIssueScheduleModule: NewIssueScheduleModule;

  beforeEach(() => {
    newIssueScheduleModule = new NewIssueScheduleModule();
  });

  it('should create an instance', () => {
    expect(newIssueScheduleModule).toBeTruthy();
  });
});
