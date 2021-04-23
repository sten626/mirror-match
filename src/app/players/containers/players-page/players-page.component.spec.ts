import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import * as fromRoot from '@mm/reducers';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { PlayersPageComponent } from './players-page.component';

describe('PlayersPageComponent', () => {
  let component: PlayersPageComponent;
  let fixture: ComponentFixture<PlayersPageComponent>;
  let mockStore: MockStore;

  class MockMatBottomSheet {
    open() {
      return {
        afterDismissed: () => of('')
      };
    }
  }

  class MockMatDialog {
    open() {
      return {
        afterClosed: () => of(true)
      };
    }
  }

  @Component({ selector: 'mm-players-list', template: '' })
  class PlayersListStubComponent {
    @Input() players: any;
  }

  @Component({ selector: 'mm-setup-footer', template: '' })
  class SetupFooterStubComponent {}

  @Component({ selector: 'mm-setup-header', template: '' })
  class SetupHeaderStubComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PlayersListStubComponent,
        SetupFooterStubComponent,
        SetupHeaderStubComponent,
        PlayersPageComponent
      ],
      providers: [
        { provide: MatBottomSheet, useClass: MockMatBottomSheet },
        { provide: MatDialog, useClass: MockMatDialog },
        provideMockStore()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(fromRoot.selectAllPlayers, []);
    fixture = TestBed.createComponent(PlayersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
