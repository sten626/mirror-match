import { Component, Input } from '@angular/core';

@Component({
  selector: 'mm-setup-side-sheet',
  templateUrl: './setup-side-sheet.component.html',
  styleUrls: ['./setup-side-sheet.component.scss']
})
export class SetupSideSheetComponent {
  @Input() recommendedTotalRounds: number;

  constructor() {}
}
