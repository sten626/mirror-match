import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'app/shared';
import {
  PairingsListComponent,
  PairingsListFormComponent,
  PairingsMenuComponent,
  PlayerFormComponent,
  PlayerListComponent,
  PlayersInfoComponent,
  RoundInfoComponent,
  StartFormComponent,
  SwissMenuComponent
} from 'app/swiss/components';
import { EventInfoComponent, PairingsPageComponent, PlayersPageComponent, SwissComponent } from 'app/swiss/containers';
import { PairingEffects, PlayerEffects, RoundEffects } from 'app/swiss/effects';
import { TournamentStartedGuard } from 'app/swiss/guards/tournament-started-guard.service';
import { MatchResultsComponent } from 'app/swiss/components/match-results.component';
import { reducers } from 'app/swiss/reducers';
import { StandingsGuard } from 'app/swiss/standings-guard.service';
import { SwissRoutingModule } from 'app/swiss/swiss-routing.module';
import { SwissStandingsComponent } from 'app/swiss/swiss-standings.component';

@NgModule({
  imports: [
    EffectsModule.forFeature([PairingEffects, PlayerEffects, RoundEffects]),
    SharedModule,
    StoreModule.forFeature('swiss', reducers),
    SwissRoutingModule
  ],
  declarations: [
    EventInfoComponent,
    MatchResultsComponent,
    PairingsListComponent,
    PairingsListFormComponent,
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
