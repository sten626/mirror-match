import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPlayerListItemComponent } from './add-player-list-item.component';

describe('AddPlayerListItemComponent', () => {
  let component: AddPlayerListItemComponent;
  let fixture: ComponentFixture<AddPlayerListItemComponent>;

  // tslint:disable-next-line: component-selector
  @Component({ selector: 'mat-list-item', template: '' })
  class ListItemStubComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPlayerListItemComponent, ListItemStubComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlayerListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
