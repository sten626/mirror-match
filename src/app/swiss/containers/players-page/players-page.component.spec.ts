import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import { generateMockPlayer, Player, SharedModule } from 'app/shared';
import { PlayersApiActions, PlayersPageActions } from 'app/swiss/actions';
import { PlayersPageComponent } from 'app/swiss/containers/players-page/players-page.component';
import * as fromSwiss from 'app/swiss/reducers';

describe('Players Page Component', () => {
  const player1 = generateMockPlayer();
  const player1NoId: Player = {
    ...player1,
    id: null,
  };
  const player2: Player = {
    ...player1,
    id: 2,
    name: 'Jasper',
  };
  let component: PlayersPageComponent;
  let fixture: ComponentFixture<PlayersPageComponent>;
  let store: Store<fromSwiss.State>;

  @Component({ selector: 'mm-player-form', template: '' })
  class PlayerFormStubComponent {}

  @Component({ selector: 'mm-player-list', template: '' })
  class PlayerListStubComponent {}

  @Component({ selector: 'mm-start-form', template: '' })
  class StartFormStubComponent {}

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        StoreModule.forRoot({
          ...fromRoot.rootReducers,
          swiss: fromSwiss.reducers,
        }),
      ],
      declarations: [
        PlayerFormStubComponent,
        PlayerListStubComponent,
        PlayersPageComponent,
        StartFormStubComponent,
      ],
      providers: [{ provide: Router, useValue: routerSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(PlayersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* Creation */

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of players after loading data', () => {
    const players: Player[] = [player1, player2];

    store.dispatch(PlayersApiActions.loadPlayersSuccess({ players }));

    component.players$.subscribe((data) => {
      expect(data.length).toBe(players.length);
    });
  });

  /* addPlayer */

  describe('addPlayer', () => {
    it('should dispatch an action to add a player', () => {
      const action = PlayersPageActions.addPlayer({ player: player1NoId });

      component.addPlayer(player1.name);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  /* clearSelectedPlayer */

  it('should clear the selected player when clearSelectedPlayer called', () => {
    component.selectedPlayer = player1;

    expect(component.selectedPlayer).toBeDefined();

    component.clearSelectedPlayer();

    expect(component.selectedPlayer).toBeNull();
  });

  /* deletePlayer */

  describe('deletePlayer', () => {
    it('should dispatch an action to delete a player and clear same selected player', () => {
      component.selectedPlayer = player1;

      expect(component.selectedPlayer).toBeDefined();

      const playerId = player1.id!;
      const action = PlayersPageActions.deletePlayer({ playerId });
      component.deletePlayer(playerId);

      expect(store.dispatch).toHaveBeenCalledWith(action);
      expect(component.selectedPlayer).toBeNull();
    });

    it('should dispatch an action to delete a player and leave different selected player alone', () => {
      component.selectedPlayer = player1;

      expect(component.selectedPlayer).toEqual(player1);

      const playerId = player2.id!;
      const action = PlayersPageActions.deletePlayer({ playerId });
      component.deletePlayer(playerId);

      expect(store.dispatch).toHaveBeenCalledWith(action);
      expect(component.selectedPlayer).toEqual(player1);
    });
  });

  /* onStartTournament */

  describe('onStartTournament', () => {
    it('should not dispatch action when called with 0', () => {
      component.onStartTournament(0);
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });

    it('should dispatch beginEvent action', () => {
      const numberOfRounds = 3;
      const action = PlayersPageActions.beginEvent({ numberOfRounds });
      component.onStartTournament(numberOfRounds);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  /* selectPlayer */

  describe('selectPlayer', () => {
    it('should set selectedPlayer when calling selectPlayer', () => {
      component.selectPlayer(player1);

      expect(component.selectedPlayer).toEqual(player1);
    });

    it('should set selectedPlayer to null', () => {
      component.selectPlayer(null);

      expect(component.selectedPlayer).toBeNull();
    });
  });

  /* togglePlayerDropped */

  describe('togglePlayerDropped', () => {
    it('should dispatch action and set selectedPlayer to null when called with a player', () => {
      component.selectedPlayer = player1;
      expect(component.selectedPlayer).toEqual(player1);

      const action = PlayersPageActions.togglePlayerDropped({
        player: player1,
      });
      component.togglePlayerDropped(player1);
      expect(store.dispatch).toHaveBeenCalledWith(action);
      expect(component.selectedPlayer).toBeNull();
    });
  });

  /* updatePlayerName */

  describe('updatePlayerName', () => {
    it("should dispatch an action to update a player's name when called", () => {
      const newName = 'Steven';
      const action = PlayersPageActions.updatePlayerName({
        player: player1,
        name: newName,
      });
      component.updatePlayerName({ player: player1, name: newName });

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should not dispatch an action when called with no player', () => {
      component.updatePlayerName({ player: null, name: 'Steven' });
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });
  });
});
