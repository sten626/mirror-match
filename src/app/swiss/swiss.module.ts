import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'app/shared';
import {
  MatchResultsComponent,
  PairingsListComponent,
  PairingsListFormComponent,
  PairingsMenuComponent,
  PlayerFormComponent,
  PlayerListComponent,
  PlayersInfoComponent,
  RoundInfoComponent,
  StandingsTableComponent,
  StartFormComponent,
  SwissMenuComponent,
} from 'app/swiss/components';
import {
  EventInfoComponent,
  PairingsPageComponent,
  PlayersPageComponent,
  StandingsPageComponent,
  SwissComponent,
} from 'app/swiss/containers';
import {
  PairingEffects,
  PlayerEffects,
  RoundEffects,
  SwissEffects,
} from 'app/swiss/effects';
import { StandingsGuard, TournamentStartedGuard } from 'app/swiss/guards';
import * as fromSwiss from 'app/swiss/reducers';
import { SwissRoutingModule } from 'app/swiss/swiss-routing.module';

@NgModule({
  imports: [
    EffectsModule.forFeature([
      PairingEffects,
      PlayerEffects,
      RoundEffects,
      SwissEffects,
    ]),
    SharedModule,
    StoreModule.forFeature(fromSwiss.swissFeatureKey, fromSwiss.reducers),
    SwissRoutingModule,
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
    StandingsPageComponent,
    StandingsTableComponent,
  ],
  providers: [StandingsGuard, TournamentStartedGuard],
})
export class SwissModule {}
