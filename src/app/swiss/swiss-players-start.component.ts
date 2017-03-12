import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { PairingsService } from '../shared';

@Component({
  selector: 'mm-swiss-players-start',
  templateUrl: './swiss-players-start.component.html'
})
export class SwissPlayersStartComponent implements OnChanges, OnInit {
  @Input() numPlayers: number;
  @Input() numRounds: number;

  isFormDisabled = false;
  swissPlayersStartForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pairingsService: PairingsService,
    private router: Router
  ) { }

  canBeginEvent(): boolean {
    return this.swissPlayersStartForm.valid && this.numPlayers >= 4 && !this.isFormDisabled;
  }

  ngOnChanges() {
    if (this.swissPlayersStartForm) {
      this.swissPlayersStartForm.reset({
        numberOfRounds: this.numRounds
      });
    }
  }

  ngOnInit() {
    this.createForm();
    this.pairingsService.hasBegunPairings().subscribe(hasBegunPairings => {
      this.isFormDisabled = hasBegunPairings;

      if (this.isFormDisabled) {
        this.swissPlayersStartForm.get('numberOfRounds').disable();
      } else {
        this.swissPlayersStartForm.get('numberOfRounds').enable();
      }
    });
  }

  onSubmit() {
    this.numRounds = this.swissPlayersStartForm.value.numberOfRounds;
    this.pairingsService.roundsTotal = this.numRounds;
    this.pairingsService.beginPairings();
    this.router.navigate(['/swiss/pairings']);
  }

  private createForm() {
    this.swissPlayersStartForm = this.fb.group({
      numberOfRounds: this.numRounds
    });
  }
}
