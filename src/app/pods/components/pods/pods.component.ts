import { Component, Input } from '@angular/core';

@Component({
  selector: 'mm-pods',
  templateUrl: './pods.component.html',
  styleUrls: ['./pods.component.scss']
})
export class PodsComponent {
  @Input() pods: string[][];

  constructor() {}
}
