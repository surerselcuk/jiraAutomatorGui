import { SclistModule } from './sclist.module';

describe('SclistModule', () => {
  let sclistModule: SclistModule;

  beforeEach(() => {
    sclistModule = new SclistModule();
  });

  it('should create an instance', () => {
    expect(sclistModule).toBeTruthy();
  });
});
