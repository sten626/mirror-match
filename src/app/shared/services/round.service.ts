import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

import { PlayerService } from '../services';

@Injectable()
export class RoundService {
    canBeginTournament: Observable<boolean>;

    constructor(
      private playerService: PlayerService
    ) {
      this.canBeginTournament = this.playerService.numberOfPlayers.map(numPlayers => numPlayers >= 4).distinctUntilChanged();
    }
}
