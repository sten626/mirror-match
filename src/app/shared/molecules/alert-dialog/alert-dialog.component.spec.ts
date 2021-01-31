import { Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  AlertDialogComponent,
  AlertDialogData
} from './alert-dialog.component';

describe('AlertDialogComponent', () => {
  let component: AlertDialogComponent;
  let dialogData: AlertDialogData = {
    content: '',
    confirmButtonText: 'confirm'
  };
  let fixture: ComponentFixture<AlertDialogComponent>;

  @Directive({ selector: '[mat-dialog-close]' })
  class MatDialogCloseDirectiveStub {
    @Input('mat-dialog-close') dialogResult: any;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: MAT_DIALOG_DATA, useValue: dialogData }],
      declarations: [AlertDialogComponent, MatDialogCloseDirectiveStub]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
