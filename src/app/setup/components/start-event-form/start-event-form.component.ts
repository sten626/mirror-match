import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'mm-start-event-form',
  templateUrl: './start-event-form.component.html',
  styleUrls: ['./start-event-form.component.scss']
})
export class StartEventFormComponent implements OnChanges {
  @Input() recommendedTotalRounds: number;

  startForm = this.fb.group({
    rounds: [''],
    bestOf: [3],
    makeDraftPods: [false]
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges() {
    this.startForm.get('rounds').reset(this.recommendedTotalRounds);
  }
}
