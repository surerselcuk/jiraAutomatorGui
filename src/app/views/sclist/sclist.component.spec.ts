import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SclistComponent } from './sclist.component';

describe('SclistComponent', () => {
  let component: SclistComponent;
  let fixture: ComponentFixture<SclistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SclistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
