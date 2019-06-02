import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'app/shared';
import {
  PairingsMenuComponent,
  PlayerFormComponent,
  PlayerListComponent,
  PlayersInfoComponent,
  RoundInfoComponent,
  StartFormComponent,
  SwissMenuComponent,
} from 'app/swiss/components';
import { EventInfoComponent, PairingsPageComponent, PlayersPageComponent, SwissComponent } from 'app/swiss/containers';
import { PlayerEffects, RoundEffects, TournamentEffects } from 'app/swiss/effects';
import { TournamentStartedGuard } from 'app/swiss/guards/tournament-started-guard.service';
import { MatchResultsComponent } from 'app/swiss/match-results.component';
import { PairingsListComponent } from 'app/swiss/pairings-list.component';
import { reducers } from 'app/swiss/reducers';
import { StandingsGuard } from 'app/swiss/standings-guard.service';
import { SwissRoutingModule } from 'app/swiss/swiss-routing.module';
import { SwissStandingsComponent } from 'app/swiss/swiss-standings.component';

@NgModule({
  imports: [
    EffectsModule.forFeature([PlayerEffects, RoundEffects, TournamentEffects]),
    SharedModule,
    StoreModule.forFeature('swiss', reducers),
    SwissRoutingModule
  ],
  declarations: [
    EventInfoComponent,
    MatchResultsComponent,
    PairingsListComponent,
    PairingsMenuComponent,
    PairingsPageComponent,
    PlayerFormComponent,
    PlayerListComponent,
    PlayersInfoComponent,
    PlayersPageComponent,
    RoundInfoComponent,
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
