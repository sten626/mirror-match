import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartEventFormComponent } from './start-event-form.component';

describe('StartEventFormComponent', () => {
  let component: StartEventFormComponent;
  let fixture: ComponentFixture<StartEventFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartEventFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
