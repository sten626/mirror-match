import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared';
import { PlayerFormComponent, PlayerListComponent, StartFormComponent, SwissMenuComponent } from './components';
import { PairingsPageComponent, PlayersPageComponent, SwissComponent } from './containers';
import { PlayerEffects } from './effects/player.effects';
import { TournamentEffects } from './effects/tournament.effects';
import { EventInfoComponent } from './event-info.component';
import { TournamentStartedGuard } from './guards/tournament-started-guard.service';
import { MatchResultsComponent } from './match-results.component';
import { PairingsListComponent } from './pairings-list.component';
import { reducers } from './reducers';
import { StandingsGuard } from './standings-guard.service';
import { SwissRoutingModule } from './swiss-routing.module';
import { SwissStandingsComponent } from './swiss-standings.component';

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
    SwissComponent,
    SwissMenuComponent,
    SwissStandingsComponent
  ],
  providers: [
    StandingsGuard,
    TournamentStartedGuard
  ]
})
export class SwissModule { }
