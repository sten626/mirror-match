import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromPlayers from '@app/core/reducers/players.reducer';
import * as fromPods from '@app/pods/reducers/pods.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PodsPageComponent } from './pods-page.component';

describe('PodsPageComponent', () => {
  let component: PodsPageComponent;
  let fixture: ComponentFixture<PodsPageComponent>;
  let store: MockStore;
  const initialState = {
    [fromPlayers.playersFeatureKey]: fromPlayers.initialState,
    [fromPods.podsFeatureKey]: fromPods.initialState
  };

  @Component({ selector: 'mm-pods', template: '' })
  class PodsStubComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PodsPageComponent, PodsStubComponent],
      providers: [provideMockStore({ initialState })],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(PodsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
