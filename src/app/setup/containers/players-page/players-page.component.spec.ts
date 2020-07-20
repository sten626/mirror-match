import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import * as fromRoot from '@app/reducers';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PlayersPageComponent } from './players-page.component';

describe('PlayersPageComponent', () => {
  let component: PlayersPageComponent;
  let fixture: ComponentFixture<PlayersPageComponent>;
  let store: MockStore;

  @Component({ selector: 'mm-add-player-form', template: '' })
  class AddPlayerFormStubComponent {}

  @Component({ selector: 'mm-bottom-sheet', template: '' })
  class BottomSheetStubComponent {
    @Input() show: boolean;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
      declarations: [
        AddPlayerFormStubComponent,
        BottomSheetStubComponent,
        PlayersPageComponent
      ],
      imports: [MatIconModule, NoopAnimationsModule, RouterTestingModule]
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
