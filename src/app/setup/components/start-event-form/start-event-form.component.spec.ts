import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { StartEventFormComponent } from './start-event-form.component';

describe('StartEventFormComponent', () => {
  let component: StartEventFormComponent;
  let fixture: ComponentFixture<StartEventFormComponent>;

  // tslint:disable-next-line: component-selector
  @Component({ selector: 'mat-label', template: '' })
  class MatLabelStubComponent {}

  // tslint:disable-next-line: component-selector
  @Component({ selector: 'mat-form-field', template: '' })
  class MatFormFieldStubComponent {}

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          MatLabelStubComponent,
          MatFormFieldStubComponent,
          StartEventFormComponent
        ],
        imports: [MatRadioModule, MatSlideToggleModule, ReactiveFormsModule]
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
