import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromRoot from '@mm/reducers';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SetupPageComponent } from './setup-page.component';

describe('SetupPageComponent', () => {
  let component: SetupPageComponent;
  let fixture: ComponentFixture<SetupPageComponent>;
  let mockStore: MockStore;

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
        SetupPageComponent
      ],
      providers: [provideMockStore()]
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(fromRoot.selectAllPlayers, []);
    fixture = TestBed.createComponent(SetupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
