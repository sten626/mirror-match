import { Pairing } from './pairing.model';

interface RoundInterface {
  id: number;
  pairings: Pairing[];
}

export type Round = Readonly<RoundInterface>;
