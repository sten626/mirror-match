import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared';
import { PlayerFormComponent } from './components/player-form.component';
import { PlayerListComponent } from './components/player-list.component';
import { StartFormComponent } from './components/start-form.component';
import { SwissMenuComponent } from './components/swiss-menu.component';
import { PlayersPageComponent } from './containers/players-page.component';
import { SwissComponent } from './containers/swiss.component';
import { EventInfoComponent } from './event-info.component';
import { TournamentStartedGuard } from './guards/tournament-started-guard.service';
import { MatchResultsComponent } from './match-results.component';
import { PairingsListComponent } from './pairings-list.component';
import { StandingsGuard } from './standings-guard.service';
import { SwissPairingsComponent } from './swiss-pairings.component';
import { SwissStandingsComponent } from './swiss-standings.component';

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
    component: PlayersPageComponent
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
    PlayerFormComponent,
    PlayerListComponent,
    PlayersPageComponent,
    StartFormComponent,
    SwissMenuComponent,
    SwissStandingsComponent
  ],
  providers: [
    StandingsGuard,
    TournamentStartedGuard
  ]
})
export class SwissModule { }
