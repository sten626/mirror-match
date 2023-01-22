interface PlayerInterface {
  id: number | null; // TODO: Revisit this type ones things are stable.
  name: string;
  dropped: boolean;
}

export type Player = Readonly<PlayerInterface>;

export function generateMockPlayer(): Player {
  return {
    id: 1,
    name: 'Steven',
    dropped: false,
  };
}
