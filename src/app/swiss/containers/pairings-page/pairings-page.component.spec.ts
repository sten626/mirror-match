import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import * as fromRoot from '@app/reducers';
import { Pairing, Player } from '@app/shared';
import { PairingsPageActions } from '@app/swiss/actions';
import { PairingsPageComponent } from '@app/swiss/containers/pairings-page/pairings-page.component';
import * as fromSwiss from '@app/swiss/reducers';

describe('PairingsPageComponent', () => {
  let component: PairingsPageComponent;
  let fixture: ComponentFixture<PairingsPageComponent>;
  let store: Store<fromSwiss.State>;
  let pairing1: Pairing;
  let pairing2: Pairing;
  let pairingB: Pairing;
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
          ...fromRoot.rootReducers,
          swiss: fromSwiss.reducers,
        }),
      ],
      declarations: [
        MatchResultsStubComponent,
        PairingsListStubComponent,
        PairingsMenuStubComponent,
        PairingsPageComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
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
      submitted: false,
    };
    pairing2 = {
      id: 2,
      table: 2,
      player1Id: 3,
      player2Id: 4,
      player1Wins: 0,
      player2Wins: 0,
      draws: 0,
      submitted: false,
    };
    pairingB = {
      id: 3,
      table: 0,
      player1Id: 0,
      player2Id: null,
      player1Wins: 2,
      player2Wins: 0,
      draws: 0,
      submitted: true,
    };
    player1 = {
      id: 1,
      name: 'Sten',
      dropped: false,
    };
    player2 = {
      id: 2,
      name: 'Spike',
      dropped: false,
    };
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(PairingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* onChangeSelectedRound */

  describe('onChangeSelectedRound', () => {
    it('should dispatch an action when called with null', () => {
      const roundId = null;
      const action = PairingsPageActions.changeSelectedRound({ roundId });
      component.onChangeSelectedRound(roundId);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should dispatch an action when called with a round ID', () => {
      const roundId = 1;
      const action = PairingsPageActions.changeSelectedRound({ roundId });
      component.onChangeSelectedRound(roundId);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  /* onClearMatchResult */

  describe('onClearMatchResult', () => {
    it('should dispatch an action when called with a pairing', () => {
      const action = PairingsPageActions.clearMatchResult({
        pairing: pairing1,
      });
      component.onClearMatchResult(pairing1);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  /* onCreateNextRound */

  it('should dispatch an action when onCreateNextRound is called', () => {
    const action = PairingsPageActions.createNextRound();
    component.onCreateNextRound();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  /* onCreatePairings */

  describe('onCreatePairings', () => {
    it('should dispatch an action when called with a round ID', () => {
      const roundId = 1;
      const action = PairingsPageActions.createPairings({ roundId });
      component.onCreatePairings(roundId);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  /* onDeleteResults */

  describe('onDeleteResults', () => {
    it('should do nothing when called with an empty list', () => {
      component.onDeleteResults([]);
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });

    it('should dispatch an action when called with a list with one item', () => {
      const pairings = [pairing1];
      const action = PairingsPageActions.clearResults({ pairings });
      component.onDeleteResults(pairings);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should dispatch an action when called with a list with multiple items', () => {
      const pairings = [pairing1, pairing2];
      const action = PairingsPageActions.clearResults({ pairings });
      component.onDeleteResults(pairings);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  /* onDropPlayers */

  describe('onDropPlayers', () => {
    it('should do nothing when called with an empty list', () => {
      component.onDropPlayers([]);
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });

    it('should dispatch an action when called with a single player', () => {
      const players = [player1];
      const action = PairingsPageActions.dropPlayers({ players });
      component.onDropPlayers(players);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should dispatch an action when called with multiple players', () => {
      const players = [player1, player2];
      const action = PairingsPageActions.dropPlayers({ players });
      component.onDropPlayers(players);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  /* onRedoMatches */

  describe('onRedoMatches', () => {
    it('should dispatch an action when called with a round ID', () => {
      const roundId = 1;
      const action = PairingsPageActions.deletePairings({ roundId });
      component.onRedoMatches(roundId);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  /* onSelectPairing */

  describe('onSelectPairing', () => {
    it('should do nothing when called with a bye pairing', () => {
      component.onSelectPairing(pairingB);
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });

    it('should dispatch an action when called with a normal pairing', () => {
      const action = PairingsPageActions.selectPairing({ pairingId: 1 });
      component.onSelectPairing(pairing1);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  /* onSubmitResult */

  describe('onSubmitResult', () => {
    it('should dispatch an action when called with a pairing', () => {
      const action = PairingsPageActions.submitResult({ pairing: pairing1 });
      component.onSubmitResult(pairing1);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });
});
