import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as fromSwiss from 'app/swiss/reducers';
import { StandingsPageComponent } from './standings-page.component';

describe('StandingsPageComponent', () => {
  let component: StandingsPageComponent;
  let fixture: ComponentFixture<StandingsPageComponent>;
  let store: MockStore<fromSwiss.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StandingsPageComponent
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: 'fromSwiss.getPlayerEntities', value: {} },
            { selector: fromSwiss.getStandings, value: [] }
          ]
        })
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(StandingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
