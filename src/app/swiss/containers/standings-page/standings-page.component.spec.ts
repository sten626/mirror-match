// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { combineReducers, Store, StoreModule } from '@ngrx/store';
// import * as fromRoot from '@mm/reducers';
// import * as fromSwiss from '@mm/swiss/reducers';
// import { StandingsPageComponent } from './standings-page.component';

// describe('StandingsPageComponent', () => {
//   let component: StandingsPageComponent;
//   let fixture: ComponentFixture<StandingsPageComponent>;
//   let store: Store<fromSwiss.State>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         StoreModule.forRoot({
//           ...fromRoot.rootReducers,
//           swiss: combineReducers(fromSwiss.reducers)
//         })
//       ],
//       declarations: [
//         StandingsPageComponent
//       ],
//       schemas: [ NO_ERRORS_SCHEMA ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     store = TestBed.inject(Store);
//     spyOn(store, 'dispatch').and.callThrough();
//     fixture = TestBed.createComponent(StandingsPageComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   afterEach(() => {
//     fixture.destroy();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
