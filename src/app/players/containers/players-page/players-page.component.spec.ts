import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as fromRoot from '@mm/reducers';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { PlayersPageComponent } from './players-page.component';

describe('PlayersPageComponent', () => {
  let component: PlayersPageComponent;
  let fixture: ComponentFixture<PlayersPageComponent>;
  let mockStore: MockStore;

  class MockMatDialog {
    open() {
      return {
        afterClosed: () => of(true)
      };
    }
  }

  class MockMatSnackBar {}

  @Component({ selector: 'mm-players-list', template: '' })
  class PlayersListStubComponent {
    @Input() players: any;
  }

  @Component({ selector: 'mm-setup-footer', template: '' })
  class SetupFooterStubComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PlayersListStubComponent,
        SetupFooterStubComponent,
        PlayersPageComponent
      ],
      providers: [
        { provide: MatDialog, useClass: MockMatDialog },
        { provide: MatSnackBar, useClass: MockMatSnackBar },
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
