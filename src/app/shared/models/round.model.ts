interface RoundInterface {
  id: number;
  pairingIds: number[];
}

export type Round = Readonly<RoundInterface>;
