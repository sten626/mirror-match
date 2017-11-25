import { PlayerService } from './player.service';

describe('PlayerService', () => {
  let service: PlayerService;

  beforeEach(() => {
    service = new PlayerService();
  });

  it('#get should return null for non-existent id', () => {
    expect(service.get(1)).toBeNull();
  });
});
