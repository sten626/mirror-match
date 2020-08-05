import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mm-edit-player-page',
  templateUrl: './edit-player-page.component.html',
  styleUrls: ['./edit-player-page.component.scss']
})
export class EditPlayerPageComponent implements OnInit {
  id: number;

  constructor(private location: Location, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
    });
  }

  back() {
    this.location.back();
  }
}
