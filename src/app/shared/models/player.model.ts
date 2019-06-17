interface PlayerInterface {
  id: number;
  name: string;
  dropped: boolean;
}

export type Player = Readonly<PlayerInterface>;
