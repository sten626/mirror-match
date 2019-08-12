import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { EventInfoPageActions } from 'app/swiss/actions';
import * as fromSwiss from 'app/swiss/reducers';
import { EventInfoComponent } from './event-info.component';

describe('EventInfoComponent', () => {
  let component: EventInfoComponent;
  let fixture: ComponentFixture<EventInfoComponent>;
  let store: Store<fromSwiss.State>;

  @Component({ selector: 'mm-players-info', template: '' })
  class PlayersInfoStubComponent {}

  @Component({ selector: 'mm-round-info', template: '' })
  class RoundInfoStubComponent {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        EventInfoComponent,
        PlayersInfoStubComponent,
        RoundInfoStubComponent
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: fromSwiss.getCompletedRoundId, value: 0 },
            { selector: fromSwiss.getNumberOfRounds, value: 0 },
            { selector: fromSwiss.getSelectedRoundPairingsOutstandingTotal, value: 0 },
            { selector: fromSwiss.getTotalActivePlayers, value: 0 },
            { selector: fromSwiss.getTotalDroppedPlayers, value: 0 },
            { selector: 'fromSwiss.getTotalPlayers', value: 0 },
            { selector: 'fromSwiss.getTotalRounds', value: 0 }
          ]
        })
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(EventInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* cancelEndEvent */

  it('should hide the warning when cancelEndEvent called', () => {
    const eventInfoDe: DebugElement = fixture.debugElement;
    const eventInfoEl: HTMLElement = eventInfoDe.nativeElement;
    let alert: Element;

    component.showEndEventConfirmation = true;
    fixture.detectChanges();
    alert = eventInfoEl.querySelector('.alert');
    expect(alert).toBeTruthy();

    component.cancelEndEvent();
    expect(component.showEndEventConfirmation).toEqual(false);
    fixture.detectChanges();
    alert = eventInfoEl.querySelector('.alert');
    expect(alert).toBeNull();
  });

  /* endEventConfirm */

  it('should dispatch action when endEventConfirm called', () => {
    const action = EventInfoPageActions.endEventConfirmed();
    component.endEventConfirm();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  /* endEventClicked */

  it('should display warning when endEventClicked called', () => {
    const eventInfoDe: DebugElement = fixture.debugElement;
    const eventInfoEl: HTMLElement = eventInfoDe.nativeElement;
    let alert: Element;

    expect(component.showEndEventConfirmation).toEqual(false);
    alert = eventInfoEl.querySelector('.alert');
    expect(alert).toBeNull();

    component.endEventClicked();
    fixture.detectChanges();
    expect(component.showEndEventConfirmation).toEqual(true);
    alert = eventInfoEl.querySelector('.alert');
    expect(alert).toBeTruthy();
  });
});
