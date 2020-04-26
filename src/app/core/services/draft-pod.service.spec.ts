import { TestBed } from '@angular/core/testing';
import { DraftPodService } from './draft-pod.service';

function getMockPlayerIds(numPlayers: number): number[] {
  const playerIds: number[] = [];

  for (let i = 0; i < numPlayers; i++) {
    playerIds.push(i);
  }

  return playerIds;
}

describe('DraftPodService', () => {
  let service: DraftPodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DraftPodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('buildPods', () => {
    const data = new Map<number, number[]>([
      [6, [6]],
      [7, [7]],
      [8, [8]],
      [9, [9]],
      [10, [10]],
      [11, [11]],
      [12, [6, 6]],
      [13, [7, 6]],
      [14, [7, 7]],
      [15, [8, 7]],
      [16, [8, 8]],
      [17, [9, 8]],
      [18, [6, 6, 6]],
      [19, [7, 6, 6]],
      [20, [7, 7, 6]],
      [25, [7, 6, 6, 6]]
    ]);

    data.forEach((value, key) => {
      it(`should return pods ${value} with ${key} players`, () => {
        const playerIds = getMockPlayerIds(key);
        const pods = service.buildPods(playerIds);
        const expectedNumPods = value.length;
        expect(pods.length).toBe(expectedNumPods);

        value.forEach((podSize, i) => {
          expect(pods[i].length).toBe(podSize);
        });
      });
    });
  });
});
