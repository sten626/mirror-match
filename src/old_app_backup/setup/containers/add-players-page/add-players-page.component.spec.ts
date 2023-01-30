import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayersPageComponent } from './add-players-page.component';

describe('AddPlayersPageComponent', () => {
  let component: AddPlayersPageComponent;
  let fixture: ComponentFixture<AddPlayersPageComponent>;

  @Component({ selector: 'mm-icon', template: '' })
  class IconStubComponent {}

  @Component({ selector: 'mm-list-item', template: '' })
  class ListItemStubComponent {}

  @Component({ selector: 'mm-list', template: '' })
  class ListStubComponent {}

  @Component({ selector: 'mm-top-app-bar', template: '' })
  class TopAppBarStubComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AddPlayersPageComponent,
        IconStubComponent,
        ListItemStubComponent,
        ListStubComponent,
        TopAppBarStubComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPlayersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
