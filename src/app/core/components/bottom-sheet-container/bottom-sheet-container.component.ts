import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mm-bottom-sheet-container',
  templateUrl: './bottom-sheet-container.component.html',
  styleUrls: ['./bottom-sheet-container.component.scss'],
  animations: [
    trigger('backdrop', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class BottomSheetContainerComponent implements OnInit {
  @Output() close = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
