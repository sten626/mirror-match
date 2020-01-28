import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromRoot from '@app/reducers';
import { MemoizedSelector, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let store: MockStore<fromRoot.State>;
  let mockUrlSelector: MemoizedSelector<fromRoot.State, string>;

  @Component({selector: 'mm-toolbar', template: ''})
  class ToolbarStubComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LayoutComponent,
        ToolbarStubComponent
      ],
      providers: [
        provideMockStore()
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    mockUrlSelector = store.overrideSelector(fromRoot.getUrl, '');
    spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the title based on URL', () => {
    mockUrlSelector.setResult('/setup');
    store.refreshState();
    fixture.detectChanges();
    expect(component.toolbarHeader).toBe('Setup');
  });
});
