import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromTournament from '@app/tournament/reducers';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockStore: MockStore;
  @Component({ selector: 'mm-layout', template: '' })
  class LayoutStubComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, LayoutStubComponent],
      providers: [provideMockStore()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(fromTournament.hasAnythingStarted, false);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));
});
