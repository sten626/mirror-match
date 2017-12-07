import { PlayerService } from './player.service';
import { Player } from '../models';

describe('PlayerService', () => {
  let service: PlayerService;

  beforeEach(() => {
    localStorage.clear();
    service = new PlayerService();
  });

  it('#delete should give error for null id.', () => {
    const deleteNull = function() {
      service.delete(null);
    };

    expect(deleteNull).toThrowError(TypeError, 'Can\'t delete when no player given.');
  });

  it('#delete non-existent player should leave players unaffected', () => {
    const player1 = new Player({
      name: 'Steven'
    });

    const player2 = new Player({
      name: 'Esther'
    });

    service.save(player1);

    let subscription = service.players.subscribe((players: Player[]) => {
      expect(players.length).toBe(1);
    });

    subscription.unsubscribe();
    service.delete(player2);

    subscription = service.players.subscribe((players: Player[]) => {
      expect(players.length).toBe(1);
      expect(players[0].name).toBe('Steven');
    });
  });

  it('#get should return null for null id.', () => {
    expect(service.get(null)).toBeNull();
  });

  it('#get should return null for non-existent id', () => {
    expect(service.get(1)).toBeNull();
  });

  it('#save should add a new player to active players', () => {
    let subscription = service.players.subscribe((players: Player[]) => {
      expect(players.length).toBe(0);
    });

    subscription.unsubscribe();

    const player = new Player({
      name: 'Steven'
    });

    service.save(player);

    subscription = service.players.subscribe((players: Player[]) => {
      expect(players.length).toBe(1);
      const savedPlayer = players[0];
      expect(savedPlayer.name).toBe('Steven');
      expect(savedPlayer.id).toBe(1);
    });

    subscription.unsubscribe();
  });

  it('#save should throw an error for a null Player', () => {
    const saveNull = function() {
      service.save(null);
    };
    expect(saveNull).toThrowError(TypeError, 'No Player given for saving.');
  });
});
