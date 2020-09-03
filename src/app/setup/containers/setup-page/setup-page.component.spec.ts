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

  // tslint:disable-next-line: component-selector
  @Component({ selector: 'mat-sidenav-container', template: '' })
  class MatSidenavContainerStubComponent {}

  // tslint:disable-next-line: component-selector
  @Component({ selector: 'mat-sidenav', template: '' })
  class MatSidenavStubComponent {
    @Input() fixedInViewport: boolean;
    @Input() mode: string;
    @Input() opened: boolean;
  }

  @Component({ selector: 'mm-players-list', template: '' })
  class PlayersListStubComponent {
    @Input() players: Player[];
  }

  @Component({ selector: 'mm-start-event-form', template: '' })
  class StartEventFormStubComponent {
    @Input() recommendedTotalRounds: number;
  }

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [provideMockStore()],
        declarations: [
          MatSidenavContainerStubComponent,
          MatSidenavStubComponent,
          PlayersListStubComponent,
          SetupPageComponent,
          StartEventFormStubComponent
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
