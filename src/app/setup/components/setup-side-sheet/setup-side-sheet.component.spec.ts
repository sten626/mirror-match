import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SetupSideSheetComponent } from './setup-side-sheet.component';

describe('SetupSideSheetComponent', () => {
  let component: SetupSideSheetComponent;
  let fixture: ComponentFixture<SetupSideSheetComponent>;

  @Component({ selector: 'mm-start-event-form', template: '' })
  class StartEventFormStubComponent {
    @Input() recommendedTotalRounds: number;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetupSideSheetComponent, StartEventFormStubComponent],
      imports: [NoopAnimationsModule]
    }).compileComponents();
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
