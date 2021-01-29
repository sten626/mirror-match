import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupHeaderComponent } from './setup-header.component';

describe('SetupHeaderComponent', () => {
  let component: SetupHeaderComponent;
  let fixture: ComponentFixture<SetupHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
