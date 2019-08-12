import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MessageService } from 'app/shared';
import * as fromSwiss from 'app/swiss/reducers';
import { SwissComponent } from './swiss.component';

describe('SwissComponent', () => {
  let component: SwissComponent;
  let fixture: ComponentFixture<SwissComponent>;
  let store: Store<fromSwiss.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        // StoreModule.forRoot({
        //   ...fromRoot.reducers,
        //   swiss: combineReducers(fromSwiss.reducers)
        // })
      ],
      declarations: [
        SwissComponent
      ],
      providers: [
        MessageService,
        provideMockStore({
          selectors: []
        })
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(SwissComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
