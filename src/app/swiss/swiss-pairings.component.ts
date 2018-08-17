import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, combineLatest, Subscription } from 'rxjs';
import {
  Pairing,
  PairingService,
  Player,
  PlayerService,
  RoundService
} from '../shared';

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
  private allPairingsSubmitted = false;
  private pairingsSub: Subscription;
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
    private roundService: RoundService,
    private router: Router
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

    this.pairingsSub = this.pairingsForSelectedRound$.subscribe((pairings: Pairing[]) => {
      let allSubmitted = true;

      for (const pairing of pairings) {
        if (!pairing.submitted) {
          allSubmitted = false;
          break;
        }
      }

      this.allPairingsSubmitted = allSubmitted;
    });
  }

  ngOnDestroy() {
    this.activePlayersSub.unsubscribe();
    this.pairingsSub.unsubscribe();
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

  // onLastPairingSubmitted(round: number): void {
  //   this.roundService.markRoundAsComplete(round);
  //   this.router.navigate(['/swiss/standings']);
  // }

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

  onSubmitPairing(pairing: Pairing, round: number): void {
    const allPairingsSubmitted = this.pairingService.submitPairing(pairing);

    if (allPairingsSubmitted) {
      this.roundService.markRoundAsComplete(round);
      this.router.navigate(['/swiss/standings']);
    }
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
