import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StartEventFormComponent } from './start-event-form.component';

fdescribe('StartEventFormComponent', () => {
  let component: StartEventFormComponent;
  let fixture: ComponentFixture<StartEventFormComponent>;

  // tslint:disable-next-line: component-selector
  @Component({ selector: 'mat-label', template: '' })
  class MatLabelStubComponent {}

  // tslint:disable-next-line: component-selector
  @Component({ selector: 'mat-form-field', template: '' })
  class MatFormFieldStubComponent {}

  // tslint:disable-next-line: component-selector
  @Component({ selector: 'mat-radio-button', template: '' })
  class MatRadioButtonStubComponent {
    @Input() value: number;
  }

  // tslint:disable-next-line: component-selector
  @Component({ selector: 'mat-radio-group', template: '' })
  class MatRadioGroupStubComponent {
    @Input() value: number;
  }

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          MatLabelStubComponent,
          MatFormFieldStubComponent,
          MatRadioButtonStubComponent,
          MatRadioGroupStubComponent,
          StartEventFormComponent
        ],
        imports: [ReactiveFormsModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StartEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
