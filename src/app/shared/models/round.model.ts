interface RoundInterface {
  id: number;
  pairingIds: string[];
}

export type Round = Readonly<RoundInterface>;
