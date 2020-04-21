import { Pod } from '@app/core/reducers/tournament.reducer';

export function buildPods(playerIds: number[]): Pod[] {
  playerIds = playerIds.slice();

  for (let i = playerIds.length; i; i--) {
    const j = Math.floor(Math.random() * i);
    [playerIds[i - 1], playerIds[j]] = [playerIds[j], playerIds[i - 1]];
  }

  const podSizes = getPodSizes(playerIds.length);
  const pods: Pod[] = [];

  while (podSizes.length > 0) {
    const podSize = podSizes.shift();
    const pod: Pod = playerIds.splice(0, podSize);
    pods.push(pod);
  }

  return pods;
}

function getPodSizes(numPlayers: number): number[] {
  let sizes = podSizesMinMax(numPlayers, 6, 8);

  if (sizes.length > 0) {
    return sizes;
  }

  sizes = podSizesMinMax(numPlayers, 4, 11);

  return sizes;
}

function podSizesMinMax(numPlayers: number, minSize: number, maxSize: number) {
  const sizes: number[] = [];
  let remainingPlayers = numPlayers;
  let numPods = Math.ceil(remainingPlayers / maxSize);

  while (remainingPlayers > 0) {
    const size = Math.ceil(remainingPlayers / numPods);

    if (size < minSize) {
      return [];
    }

    sizes.push(size);
    remainingPlayers -= size;
    numPods -= 1;
  }

  return sizes;
}
