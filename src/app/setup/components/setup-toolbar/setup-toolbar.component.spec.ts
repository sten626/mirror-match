import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupToolbarComponent } from './setup-toolbar.component';

describe('SetupToolbarComponent', () => {
  let component: SetupToolbarComponent;
  let fixture: ComponentFixture<SetupToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
