import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { PlayerFormComponent } from './components/player-form.component';
import { PlayerListComponent } from './components/player-list.component';
import { StartFormComponent } from './components/start-form.component';
import { SwissMenuComponent } from './components/swiss-menu.component';
import { PlayersPageComponent } from './containers/players-page.component';
import { PairingsPageComponent } from './containers/pairings-page.component';
import { EventInfoComponent } from './event-info.component';
import { TournamentStartedGuard } from './guards/tournament-started-guard.service';
import { MatchResultsComponent } from './match-results.component';
import { PairingsListComponent } from './pairings-list.component';
import { StandingsGuard } from './standings-guard.service';
import { SwissRoutingModule } from './swiss-routing.module';
import { SwissStandingsComponent } from './swiss-standings.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { PlayerEffects } from './effects/player.effects';
import { TournamentEffects } from './effects/tournament.effects';

@NgModule({
  imports: [
    EffectsModule.forFeature([PlayerEffects, TournamentEffects]),
    SharedModule,
    StoreModule.forFeature('swiss', reducers),
    SwissRoutingModule
  ],
  declarations: [
    EventInfoComponent,
    MatchResultsComponent,
    PairingsListComponent,
    PairingsPageComponent,
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
