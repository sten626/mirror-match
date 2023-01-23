import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Dictionary } from '@ngrx/entity';
import { matchResultValidator, Pairing, Player } from '@app/shared';

@Component({
  selector: 'mm-match-results',
  templateUrl: './match-results.component.html',
})
export class MatchResultsComponent implements OnChanges {
  @Input() playerEntities!: Dictionary<Player>;
  @Input() selectedPairing!: Pairing;
  @Input() selectedRoundComplete: boolean = false;
  @Output() clearMatchResult = new EventEmitter<Pairing>();
  @Output() dropPlayers = new EventEmitter<Player[]>();
  @Output() submitResult = new EventEmitter<Pairing>();

  matchResultsForm: UntypedFormGroup = this.fb.group(
    {
      player1Wins: 0,
      player2Wins: 0,
      draws: 0,
      player1Dropped: false,
      player2Dropped: false,
    },
    {
      validators: matchResultValidator,
    }
  );

  constructor(private fb: UntypedFormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedPairing'] && !changes['selectedPairing'].firstChange) {
      this.resetForm(
        this.matchResultsForm,
        changes['selectedPairing'].currentValue
      );
    }
  }

  incrementDraws() {
    const drawsControl = this.matchResultsForm.get('draws')!;
    const draws = drawsControl.value;

    if (draws < 9) {
      drawsControl.setValue(draws + 1);
    }
  }

  incrementPlayer1Wins() {
    const player1WinsControl = this.matchResultsForm.get('player1Wins')!;
    const player1Wins = player1WinsControl.value;

    if (player1Wins < 2) {
      player1WinsControl.setValue(player1Wins + 1);
    }
  }

  incrementPlayer2Wins() {
    const player2WinsControl = this.matchResultsForm.get('player2Wins')!;
    const player2Wins = player2WinsControl.value;

    if (player2Wins < 2) {
      player2WinsControl.setValue(player2Wins + 1);
    }
  }

  get player1Name(): string {
    return this.playerName(this.selectedPairing.player1Id);
  }

  get player2Name(): string {
    return this.playerName(this.selectedPairing.player2Id!);
  }

  submit() {
    const form = this.matchResultsForm;
    const pairing = {
      ...this.selectedPairing,
      player1Wins: form.get('player1Wins')!.value,
      player2Wins: form.get('player2Wins')!.value,
      draws: form.get('draws')!.value,
      submitted: true,
    };

    this.submitResult.emit(pairing);

    const playersToDrop: Player[] = [];

    if (form.get('player1Dropped')!.value) {
      playersToDrop.push(this.playerEntities[pairing.player1Id]!);
    }

    if (form.get('player2Dropped')!.value) {
      playersToDrop.push(this.playerEntities[pairing.player2Id!]!);
    }

    if (playersToDrop.length > 0) {
      this.dropPlayers.emit(playersToDrop);
    }
  }

  private playerName(playerId: number): string {
    return this.playerEntities[playerId]!.name;
  }

  private resetForm(form: UntypedFormGroup, selectedPairing: Pairing | null) {
    if (selectedPairing) {
      form.reset({
        player1Wins: selectedPairing.player1Wins,
        player2Wins: selectedPairing.player2Wins,
        draws: selectedPairing.draws,
      });
    } else {
      form.reset({
        player1Wins: 0,
        player2Wins: 0,
        draws: 0,
      });
    }
  }
}
