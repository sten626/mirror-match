import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromPods from '@app/pods/reducers/pods.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PodsPageComponent } from './pods-page.component';
import * as fromPlayers from '@app/core/reducers/players.reducer';

describe('PodsPageComponent', () => {
  let component: PodsPageComponent;
  let fixture: ComponentFixture<PodsPageComponent>;
  let store: MockStore;
  const initialState = {
    [fromPlayers.playersFeatureKey]: fromPlayers.initialState,
    [fromPods.podsFeatureKey]: fromPods.initialState
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PodsPageComponent],
      providers: [provideMockStore({ initialState })]
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
