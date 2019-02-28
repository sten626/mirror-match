import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Player, SharedModule } from '../../shared';
import { PlayerFormComponent } from './player-form.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Player Form Component', () => {
  let component: PlayerFormComponent;
  let fixture: ComponentFixture<PlayerFormComponent>;
  let player: Player;
  let nameDe: DebugElement;
  let nameEl: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule ],
      declarations: [ PlayerFormComponent ]
    });

    fixture = TestBed.createComponent(PlayerFormComponent);
    component = fixture.componentInstance;
    nameDe = fixture.debugElement.query(By.css('#player-name'));
    nameEl = nameDe.nativeElement;
    fixture.detectChanges();

    player = {
      id: '1',
      name: 'Sten'
    };
  });

  /* Reset */

  it('should emit event when reset() called', () => {
    let called = false;
    component.playerFormReset.subscribe(() => called = true);
    component.reset();

    expect(called).toBeTruthy();
  });

  /* Submit */

  describe('submit()', () => {
    it('should do nothing when called in addMode with empty name', () => {
      component.addPlayer.subscribe(() => fail('addPlayer shouldn\'t have been emitted.'));
      component.updatePlayerName.subscribe(() => fail('updatePlayerName shouldn\'t have been emitted.'));
      component.submit();
    });

    it('should emit nothing and trim field when called in addMode with whitespace', () => {
      nameEl.value = '   ';
      component.addPlayer.subscribe(() => fail('addPlayer shouldn\'t have been emitted.'));
      component.updatePlayerName.subscribe(() => fail('updatePlayerName shouldn\'t have been emitted.'));
      component.submit();
      fixture.detectChanges();

      expect(nameEl.textContent).toBe('');
    });
  });
});
