import { Component, Input } from '@angular/core';

@Component({
  selector: 'mm-pod-detail',
  templateUrl: './pod-detail.component.html',
  styleUrls: ['./pod-detail.component.scss']
})
export class PodDetailComponent {
  @Input() playerNames: string[];

  columnsToDisplay = ['seat', 'playerName'];

  constructor() {}
}
