import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { PlayerFormComponent } from './components/player-form.component';
import { PlayerListComponent } from './components/player-list.component';
import { StartFormComponent } from './components/start-form.component';
import { SwissMenuComponent } from './components/swiss-menu.component';
import { PlayersPageComponent } from './containers/players-page.component';
import { EventInfoComponent } from './event-info.component';
import { TournamentStartedGuard } from './guards/tournament-started-guard.service';
import { MatchResultsComponent } from './match-results.component';
import { PairingsListComponent } from './pairings-list.component';
import { StandingsGuard } from './standings-guard.service';
import { SwissPairingsComponent } from './swiss-pairings.component';
import { SwissRoutingModule } from './swiss-routing.module';
import { SwissStandingsComponent } from './swiss-standings.component';

@NgModule({
  imports: [
    SharedModule,
    SwissRoutingModule
  ],
  declarations: [
    EventInfoComponent,
    MatchResultsComponent,
    PairingsListComponent,
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
