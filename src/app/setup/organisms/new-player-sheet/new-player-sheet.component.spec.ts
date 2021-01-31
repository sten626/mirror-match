import { Component, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { NewPlayerSheetComponent } from './new-player-sheet.component';

describe('NewPlayerSheetComponent', () => {
  let component: NewPlayerSheetComponent;
  let fixture: ComponentFixture<NewPlayerSheetComponent>;

  @Directive({ selector: '[formControl]' })
  class FormControlDirectiveStub {
    @Input('formControl') form: FormControl;
  }

  @Component({ selector: 'mat-form-field', template: '' })
  class MatFormFieldComponentStub {}

  @Component({ selector: 'mat-label', template: '' })
  class MatLabelComponentStub {}

  class MockMatBottomSheetRef {
    dismiss() {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FormControlDirectiveStub,
        MatFormFieldComponentStub,
        MatLabelComponentStub,
        NewPlayerSheetComponent
      ],
      providers: [
        { provide: MatBottomSheetRef, useClass: MockMatBottomSheetRef }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlayerSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
