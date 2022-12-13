import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import * as fromSwiss from 'app/swiss/reducers';
import { SwissComponent } from './swiss.component';

describe('SwissComponent', () => {
  let component: SwissComponent;
  let fixture: ComponentFixture<SwissComponent>;
  let store: Store<fromSwiss.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.rootReducers,
          swiss: combineReducers(fromSwiss.reducers),
        }),
      ],
      declarations: [SwissComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(SwissComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
