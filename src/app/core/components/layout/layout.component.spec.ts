import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromRoot from '@app/reducers';
import { MemoizedSelector, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let store: MockStore<fromRoot.State>;
  let mockHasDraftStartedSelector: MemoizedSelector<fromRoot.State, boolean>;
  let mockUrlSelector: MemoizedSelector<fromRoot.State, string>;

  @Component({ selector: 'mm-toolbar', template: '' })
  class ToolbarStubComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutComponent, ToolbarStubComponent],
      providers: [provideMockStore()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    mockHasDraftStartedSelector = store.overrideSelector(
      fromRoot.hasDraftStarted,
      false
    );
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

  it('should display the pods menu item if draft has started', () => {
    mockHasDraftStartedSelector.setResult(true);
    store.refreshState();
    fixture.detectChanges();
    const layoutDe: DebugElement = fixture.debugElement;
    expect(layoutDe.nativeElement.textContent).toContain('Pods');
  });

  it('should not display the pods menu item if draft has not started', () => {
    mockHasDraftStartedSelector.setResult(false);
    store.refreshState();
    fixture.detectChanges();
    const layoutDe: DebugElement = fixture.debugElement;
    expect(layoutDe.nativeElement.textContent).not.toContain('Pods');
  });
});
