import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import {
  PlayerService
} from '../shared';

@Component({
  selector: 'mm-swiss-players-start',
  templateUrl: './swiss-players-start.component.html'
})
export class SwissPlayersStartComponent implements OnInit {
  // isFormDisabled = false;
  numberOfRounds = 3;
  swissPlayersStartForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private pairingsService: PairingsService,
    private playerService: PlayerService
    // private router: Router
  ) {}

  // canBeginEvent(): boolean {
  //   return this.swissPlayersStartForm.valid && this.numPlayers >= 4 && !this.isFormDisabled;
  // }

  // ngOnChanges() {
  //   if (this.swissPlayersStartForm) {
  //     this.swissPlayersStartForm.reset({
  //       numberOfRounds: this.numRounds
  //     });
  //   }
  // }

  ngOnInit() {
    this.createForm();
    this.playerService.recommendedNumberOfRounds.subscribe(numRounds => {
      this.numberOfRounds = numRounds;
      this.swissPlayersStartForm.reset({
        numberOfRounds: this.numberOfRounds
      });
    });
    // this.pairingsService.hasBegunPairings().subscribe(hasBegunPairings => {
    //   this.isFormDisabled = hasBegunPairings;

    //   if (this.isFormDisabled) {
    //     this.swissPlayersStartForm.get('numberOfRounds').disable();
    //   } else {
    //     this.swissPlayersStartForm.get('numberOfRounds').enable();
    //   }
    // });
  }

  onSubmit() {
    // this.numRounds = this.swissPlayersStartForm.value.numberOfRounds;
    // this.pairingsService.roundsTotal = this.numRounds;
    // this.pairingsService.beginPairings();
    // this.router.navigate(['/swiss/pairings']);
  }

  private createForm() {
    this.swissPlayersStartForm = this.fb.group({
      numberOfRounds: this.numberOfRounds
    });
  }
}
