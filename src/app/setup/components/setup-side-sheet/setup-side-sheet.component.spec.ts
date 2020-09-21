import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupSideSheetComponent } from './setup-side-sheet.component';

describe('SetupSideSheetComponent', () => {
  let component: SetupSideSheetComponent;
  let fixture: ComponentFixture<SetupSideSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupSideSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupSideSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
