import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import * as fromRoot from '@mm/reducers';
import { Player } from '@mm/shared/models';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SetupPageComponent } from './setup-page.component';

describe('SetupPageComponent', () => {
  let component: SetupPageComponent;
  let fixture: ComponentFixture<SetupPageComponent>;
  let store: MockStore;

  @Component({ selector: 'mm-setup-side-sheet', template: '' })
  class SetupSideSheetStubComponent {
    @Input() mode: any;
    @Input() recommendedTotalRounds: number;
  }

  @Component({ selector: 'mm-players-list', template: '' })
  class PlayersListStubComponent {
    @Input() playerNames: Set<string>;
    @Input() players: Player[];
  }

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [provideMockStore()],
        declarations: [
          PlayersListStubComponent,
          SetupPageComponent,
          SetupSideSheetStubComponent
        ],
        imports: [
          MatIconModule,
          MatToolbarModule,
          NoopAnimationsModule,
          RouterTestingModule
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    store.overrideSelector(fromRoot.selectAllPlayers, []);
    store.overrideSelector(fromRoot.selectRecommendedTotalRounds, 3);
    fixture = TestBed.createComponent(SetupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
