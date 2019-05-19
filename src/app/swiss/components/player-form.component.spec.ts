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
      id: 1,
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
      spyOn(component.addPlayer, 'emit');
      spyOn(component.updatePlayerName, 'emit');
      component.submit();
      expect(component.addPlayer.emit).toHaveBeenCalledTimes(0);
      expect(component.updatePlayerName.emit).toHaveBeenCalledTimes(0);
    });

    it('should emit nothing and trim field when called in addMode with whitespace', () => {
      nameEl.value = '   ';
      spyOn(component.addPlayer, 'emit');
      spyOn(component.updatePlayerName, 'emit');
      component.submit();
      fixture.detectChanges();

      expect(nameEl.textContent).toBe('');
      expect(component.addPlayer.emit).toHaveBeenCalledTimes(0);
      expect(component.updatePlayerName.emit).toHaveBeenCalledTimes(0);
    });

    it('should emit addPlayer and clear form when in addMode', () => {
      const playerName = 'Sten';
      nameEl.value = playerName;
      nameEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      let addedPlayer: Player;
      component.addMode = true;
      component.addPlayer.subscribe((p: Player) => addedPlayer = p);
      component.submit();
      fixture.detectChanges();
      expect(addedPlayer.name).toBe(playerName);
      expect(nameEl.textContent).toBe('');
      expect(component.addMode).toBe(true);
      expect(component.isPlayerDroppable).toBe(false);
    });

    it('should emit updatePlayerName and playerFormReset when in edit mode', () => {
      const newPlayerName = 'Steven';
      let eventPlayer: Player;
      let eventName: string;

      component.selectedPlayer = player;
      component.addMode = false;
      nameEl.value = newPlayerName;
      nameEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      component.updatePlayerName.subscribe((event: any) => {
        eventPlayer = event.player;
        eventName = event.name;
      });
      component.submit();
      expect(eventPlayer).toBe(player);
      expect(eventName).toBe(newPlayerName);
    });
  });
});
