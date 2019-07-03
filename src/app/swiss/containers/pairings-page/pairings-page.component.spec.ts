import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import { Pairing, Player } from 'app/shared';
import { PairingsPageActions } from 'app/swiss/actions';
import * as fromSwiss from 'app/swiss/reducers';
import { PairingsPageComponent } from './pairings-page.component';

describe('PairingsPageComponent', () => {
  let component: PairingsPageComponent;
  let fixture: ComponentFixture<PairingsPageComponent>;
  let store: Store<fromSwiss.State>;
  let pairing1: Pairing;
  let pairing2: Pairing;
  let player1: Player;
  let player2: Player;

  @Component({ selector: 'mm-match-results', template: '' })
  class MatchResultsStubComponent {}

  @Component({ selector: 'mm-pairings-list', template: '' })
  class PairingsListStubComponent {}

  @Component({ selector: 'mm-pairings-menu', template: '' })
  class PairingsMenuStubComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          swiss: combineReducers(fromSwiss.reducers)
        })
      ],
      declarations: [
        MatchResultsStubComponent,
        PairingsListStubComponent,
        PairingsMenuStubComponent,
        PairingsPageComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    pairing1 = {
      id: 1,
      table: 1,
      player1Id: 1,
      player2Id: 2,
      player1Wins: 0,
      player2Wins: 0,
      draws: 0,
      submitted: false
    };
    pairing2 = {
      id: 2,
      table: 2,
      player1Id: 3,
      player2Id: 4,
      player1Wins: 0,
      player2Wins: 0,
      draws: 0,
      submitted: false
    };
    player1 = {
      id: 1,
      name: 'Sten',
      dropped: false
    };
    player2 = {
      id: 2,
      name: 'Spike',
      dropped: false
    };
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(PairingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* clearMatchResult */

  describe('clearMatchResult', () => {
    it('should do nothing when called with null', () => {
      component.clearMatchResult(null);
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });

    it('should dispatch an action when called with a pairing', () => {
      const action = PairingsPageActions.clearMatchResult({pairing: pairing1});
      component.clearMatchResult(pairing1);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  /* createNextRound */

  it('should dispatch an action when createNextRound is called', () => {
    const action = PairingsPageActions.createNextRound();
    component.createNextRound();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  /* createPairings */

  describe('createPairings', () => {
    it('should do nothing when called with null', () => {
      component.createPairings(null);
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });

    it('should dispatch an action when called with a round ID', () => {
      const roundId = 1;
      const action = PairingsPageActions.createPairings({roundId});
      component.createPairings(roundId);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  /* deleteResults */

  describe('deleteResults', () => {
    it('should do nothing when called with null', () => {
      component.deleteResults(null);
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });

    it('should do nothing when called with an empty list', () => {
      component.deleteResults([]);
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });

    it('should dispatch an action when called with a list with one item', () => {
      const pairings = [ pairing1 ];
      const action = PairingsPageActions.clearResults({pairings});
      component.deleteResults(pairings);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should dispatch an action when called with a list with multiple items', () => {
      const pairings = [ pairing1, pairing2 ];
      const action = PairingsPageActions.clearResults({pairings});
      component.deleteResults(pairings);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  /* dropPlayers */

  describe('dropPlayers', () => {
    it('should do nothing when called with null', () => {
      component.dropPlayers(null);
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });

    it('should do nothing when called with an empty list', () => {
      component.dropPlayers([]);
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });

    it('should dispatch an action when called with a single player', () => {
      const players = [ player1 ];
      const action = PairingsPageActions.dropPlayers({players});
      component.dropPlayers(players);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should dispatch an action when called with multiple players', () => {
      const players = [ player1, player2 ];
      const action = PairingsPageActions.dropPlayers({players});
      component.dropPlayers(players);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });
});
