import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBoxComponent } from './search-box.component';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  // tslint:disable-next-line: component-selector
  @Component({ selector: 'mat-form-field', template: '' })
  class MatFormFieldStubComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatFormFieldStubComponent, SearchBoxComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
