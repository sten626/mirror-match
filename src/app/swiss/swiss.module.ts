import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventInfoComponent } from './event-info.component';
import { MatchResultsComponent } from './match-results.component';
import { PairingsListComponent } from './pairings-list.component';
import { StandingsGuard } from './standings-guard.service';
import { SwissComponent } from './swiss.component';
import { SwissPairingsComponent } from './swiss-pairings.component';
import { SwissPlayerFormComponent } from './swiss-player-form.component';
import { SwissPlayerListComponent } from './swiss-player-list.component';
import { SwissPlayersComponent } from './swiss-players.component';
import { SwissPlayersStartComponent } from './swiss-players-start.component';
import { SwissStandingsComponent } from './swiss-standings.component';
import { TournamentStartedGuard } from './tournament-started-guard.service';
import { SharedModule } from '../shared';

const routes: Routes = [{
  path: 'swiss',
  component: SwissComponent,
  children: [{
    path: '',
    redirectTo: '/swiss/players',
    pathMatch: 'full'
  }, {
    path: 'event',
    component: EventInfoComponent,
    canActivate: [TournamentStartedGuard]
  }, {
    path: 'players',
    component: SwissPlayersComponent
  }, {
    path: 'pairings',
    component: SwissPairingsComponent,
    canActivate: [TournamentStartedGuard]
  }, {
    path: 'standings',
    component: SwissStandingsComponent,
    canActivate: [StandingsGuard]
  }]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    EventInfoComponent,
    MatchResultsComponent,
    PairingsListComponent,
    SwissComponent,
    SwissPairingsComponent,
    SwissPlayerFormComponent,
    SwissPlayerListComponent,
    SwissPlayersComponent,
    SwissPlayersStartComponent,
    SwissStandingsComponent
  ],
  providers: [
    StandingsGuard,
    TournamentStartedGuard
  ]
})
export class SwissModule { }
