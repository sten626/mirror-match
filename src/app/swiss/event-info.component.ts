import { Component } from '@angular/core';

@Component({
  templateUrl: './event-info.component.html'
})
export class EventInfoComponent {
  showEndEventConfirmation = false;

  cancelEndEvent(): void {
    this.showEndEventConfirmation = false;
  }

  endEventClicked(): void {
    this.showEndEventConfirmation = true;
  }
}
