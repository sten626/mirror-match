import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BottomSheetService } from '@mm/core/services';
import * as fromRoot from '@mm/reducers';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PlayersPageComponent } from './players-page.component';

describe('PlayersPageComponent', () => {
  let component: PlayersPageComponent;
  let fixture: ComponentFixture<PlayersPageComponent>;
  let store: MockStore;

  @Component({ selector: 'mm-add-player-form', template: '' })
  class AddPlayerFormStubComponent {
    @Input() playerNames: Set<string>;
  }

  @Component({ selector: 'mm-bottom-sheet', template: '' })
  class BottomSheetStubComponent {
    @Input() show: boolean;
  }

  const bottomSheetServiceStub: Partial<BottomSheetService> = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        { provide: BottomSheetService, useValue: bottomSheetServiceStub }
      ],
      declarations: [
        AddPlayerFormStubComponent,
        BottomSheetStubComponent,
        PlayersPageComponent
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
    fixture = TestBed.createComponent(PlayersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
