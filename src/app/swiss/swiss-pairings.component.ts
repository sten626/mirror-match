import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import {
  Pairing,
  PairingService,
  RoundService
} from '../shared';

@Component({
  templateUrl: './swiss-pairings.component.html'
})
export class SwissPairingsComponent implements OnInit {
  canStartNextRound$: Observable<boolean>;
  pairings$: Observable<Pairing[]>;
  rounds$: Observable<number[]>;
  selectedRound: number;

  private totalNumOfRounds: number;

  // canStartNextRound = false;
  // rounds: Observable<number[]>;
  // pairingsForm: FormGroup;
  // players: Player[];
  // selectedRound: number;
  // selectedRoundHasPairings = false;

  constructor(
    private pairingService: PairingService,
    private roundService: RoundService
  ) {
    this.rounds$ = roundService.rounds$;
    this.canStartNextRound$ = combineLatest(
      roundService.rounds$,
      roundService.completedRounds$,
      roundService.totalNumOfRounds$,
      (rounds: number[], completedRounds: number[], totalNumOfRounds: number) => {
        return rounds.length === completedRounds.length && rounds.length < totalNumOfRounds;
      }
    );
    this.pairings$ = this.pairingService.getPairingsForRound(this.selectedRound);
  }

  ngOnInit() {
    this.roundService.loadRounds();
    this.pairingService.loadPairings();
    // TODO
  }

  createNextRound(): void {
    const newRound = this.roundService.createNextRound();
    this.selectedRound = newRound;
  }

  /**
   * Create pairings for the selected round.
   */
  createPairings(): void {

  }

  /**
   * Update pairings via pairing service, for newly selected round.
   * @param selectedRound The round being selected.
   */
  onRoundChange(selectedRound: number): void {
    this.selectedRound = selectedRound;
    this.pairings$ = this.pairingService.getPairingsForRound(this.selectedRound);
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
