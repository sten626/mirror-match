import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
  }

  @Component({ selector: 'mm-players-list', template: '' })
  class PlayersListStubComponent {
    @Input() players: Player[];
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
      declarations: [
        MatSidenavContainerStubComponent,
        MatSidenavStubComponent,
        PlayersListStubComponent,
        SetupPageComponent
      ],
      imports: [
        MatIconModule,
        MatToolbarModule,
        NoopAnimationsModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    store.overrideSelector(fromRoot.selectAllPlayers, []);
    fixture = TestBed.createComponent(SetupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
