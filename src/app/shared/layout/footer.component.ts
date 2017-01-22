import { Component } from '@angular/core';

@Component({
  selector: 'mm-layout-footer',
  styleUrls: ['./footer.component.css'],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  today: number = Date.now();
}
