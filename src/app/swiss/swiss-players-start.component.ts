import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mm-swiss-players-start',
  templateUrl: './swiss-players-start.component.html'
})
export class SwissPlayersStartComponent implements OnChanges {
  @Input() canBeginTournament: boolean;
  @Input() recommendedNumOfRounds: number;
  @Output() startClicked = new EventEmitter<number>();

  // TODO Do things with hasBegunTournament
  hasBegunTournament = false;
  numberOfRounds = 3;

  ngOnChanges(): void {
    // TODO Should I check the changes object?
    this.numberOfRounds = this.recommendedNumOfRounds;
  }

  start(): void {
    this.startClicked.emit(this.numberOfRounds);
  }

  // constructor(
  //   private playerService: PlayerService,
  //   private roundService: RoundService,
  //   private router: Router
  // ) {}

  // canBeginEvent(): boolean {
  //   return this.swissPlayersStartForm.valid && this.numPlayers >= 4 && !this.isFormDisabled;
  // }

  // ngOnInit() {
  //   // this.createForm();
  //   // this.playerService.recommendedNumberOfRounds.subscribe(numRounds => {
  //   //   this.numberOfRounds = numRounds;
  //   //   this.swissPlayersStartForm.reset({
  //   //     numberOfRounds: this.numberOfRounds
  //   //   });
  //   // });
  //   // this.roundService.canBeginTournament.subscribe((canBegin: boolean) => this.canBeginTournament = canBegin);
  //   // this.roundService.hasBegunTournament.subscribe((hasBegun: boolean) => {
  //   //   this.hasBegunTournament = hasBegun;

  //   //   if (hasBegun) {
  //   //     this.swissPlayersStartForm.disable();
  //   //   } else {
  //   //     this.swissPlayersStartForm.enable();
  //   //   }
  //   // });
  // }

  // onSubmit() {
  //   this.roundService.setTotalNumberOfRounds(this.swissPlayersStartForm.get('numberOfRounds').value);
  //   this.roundService.createNextRound();
  //   this.router.navigate(['/swiss/pairings']);
  // }

  // private createForm() {
  //   this.swissPlayersStartForm = this.fb.group({
  //     numberOfRounds: this.numberOfRounds
  //   });
  // }
}
