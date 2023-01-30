import { Component } from '@angular/core';

@Component({
  selector: 'mm-add-players-page',
  templateUrl: './add-players-page.component.html',
  styleUrls: ['./add-players-page.component.scss'],
})
export class AddPlayersPageComponent {
  players = ['Sten', 'Esther', 'Nylea'];
  constructor() {}
}
