import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromTournament from '@mm/tournament/reducers';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PodsPageComponent } from './pods-page.component';

describe('PodsPageComponent', () => {
  let component: PodsPageComponent;
  let fixture: ComponentFixture<PodsPageComponent>;
  let store: MockStore;

  @Component({ selector: 'mm-pods', template: '' })
  class PodsStubComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PodsPageComponent, PodsStubComponent],
      providers: [provideMockStore()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callThrough();
    store.overrideSelector(fromTournament.selectPodListData, []);
    fixture = TestBed.createComponent(PodsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
