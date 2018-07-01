import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, combineLatest, Subscription } from 'rxjs';
import {
  Pairing,
  PairingService,
  Player,
  PlayerService,
  RoundService
} from '../shared';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './swiss-pairings.component.html'
})
export class SwissPairingsComponent implements OnDestroy, OnInit {
  canCreatePairings$: Observable<boolean>;
  canStartNextRound$: Observable<boolean>;
  pairingsForSelectedRound$: Observable<Pairing[]>;
  rounds$: Observable<number[]>;
  selectedRound$: Observable<number>;
  // totalNumOfRounds$: Observable<number>;

  private activePlayers: Player[] = [];
  private activePlayersSub: Subscription;
  private totalNumOfRounds: number;
  private totalNumOfRoundsSub: Subscription;

  // canStartNextRound = false;
  // rounds: Observable<number[]>;
  // pairingsForm: FormGroup;
  // players: Player[];
  // selectedRound: number;
  // selectedRoundHasPairings = false;

  constructor(
    private pairingService: PairingService,
    private playerService: PlayerService,
    private roundService: RoundService
  ) {
    this.rounds$ = this.roundService.rounds$;
    this.selectedRound$ = this.roundService.selectedRound$;

    // TODO Possibly a better way to do this.
    this.pairingsForSelectedRound$ = combineLatest(
      this.roundService.selectedRound$,
      this.pairingService.pairings$,
      (round: number, pairings: Pairing[]) => {
        return pairings.filter((pairing: Pairing) => pairing.round === round);
      }
    );
    // this.totalNumOfRounds$ = roundService.totalNumOfRounds$;
    // this.canStartNextRound$ = combineLatest(
    //   roundService.rounds$,
    //   roundService.completedRounds$,
    //   roundService.totalNumOfRounds$,
    //   (rounds: number[], completedRounds: number[], totalNumOfRounds: number) => {
    //     return rounds.length === completedRounds.length && rounds.length < totalNumOfRounds;
    //   }
    // );
    // this.pairings$ = this.pairingService.getPairingsForRound(this.selectedRound);
    // this.canCreatePairings$ = this.pairings$.pipe(
    //   map((pairings: Pairing[]) => {
    //     return pairings.length === 0;
    //   })
    // );
    // this.selectedRound$ = this.roundService.selectedRound$;
  }

  ngOnInit() {
    this.playerService.loadPlayers();
    this.activePlayersSub = this.playerService.activePlayers$.subscribe((players: Player[]) => {
      this.activePlayers = players;
    });
    this.totalNumOfRoundsSub = this.roundService.totalNumOfRounds$.subscribe((totalNumOfRounds: number) => {
      this.totalNumOfRounds = totalNumOfRounds;
    });
    this.pairingService.loadPairings();
  }

  ngOnDestroy() {
    this.activePlayersSub.unsubscribe();
    this.totalNumOfRoundsSub.unsubscribe();
  }

  clearMatchResult(pairing: Pairing): void {
    this.pairingService.updatePairing(pairing);
  }

  createNextRound(): void {
    const newRound = this.roundService.createNextRound();
  }

  createPairings(selectedRound: number): void {
    this.pairingService.createPairings(this.activePlayers, selectedRound, selectedRound === this.totalNumOfRounds);
  }

  deleteResults(selectedRound: number): void {
    this.pairingService.clearResultsForRound(selectedRound);
  }

  onPlayerChanged(player: Player): void {
    this.playerService.updatePlayer(player);
  }

  /**
   * Update the currently selected round.
   * @param selectedRound The round being selected.
   */
  onSelectedRoundChanged(selectedRound: number): void {
    this.roundService.updateSelectedRound(selectedRound);
    // this.pairings$ = this.pairingService.getPairingsForRound(this.selectedRound);
  }

  onSubmitPairing(pairing: Pairing): void {
    this.pairingService.updatePairing(pairing);

    // if (this.selectedRoundComplete) {
    //   this.roundService.markRoundAsComplete(this.selectedRound);
    //   this.standingsService.calculateStandings();
    //   this.router.navigate(['/swiss/standings']);
    // }
    // TODO
  }

  redoMatches(selectedRound: number): void {
    this.pairingService.deletePairingsForRound(selectedRound);
  }

  // generatePairings(): void {
  //   const lastRound = this.roundService.getTotalNumberOfRounds();
  //   this.pairingService.createPairings(this.selectedRound, this.selectedRound === lastRound);
  // }

  // ngOnInit() {
  //   this.rounds = this.roundService.rounds;
  //   // this.createForm();
  //   this.roundService.selectedRound.subscribe((round: number) => {
  //     if (round !== this.selectedRound) {
  //       this.selectedRound = round;
  //       this.pairingsForm.reset({
  //         currentRound: this.selectedRound
  //       });
  //     }
  //   });
  //   this.roundService.selectedRoundHasPairings.subscribe((hasPairings: boolean) => this.selectedRoundHasPairings = hasPairings);
  //   this.roundService.canStartNextRound.subscribe((canStart: boolean) => this.canStartNextRound = canStart);
  // }

  // private createForm(): void {
  //   this.pairingsForm = this.fb.group({
  //     currentRound: 1
  //   });

  //   this.pairingsForm.get('currentRound').valueChanges.subscribe((value: string) => {
  //     this.roundService.setSelectedRound(parseInt(value));
  //   });
  // }
}
