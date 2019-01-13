import { DBSchema } from '@ngrx/db';

export const schema: DBSchema = {
  version: 1,
  name: 'mirror_match_app',
  stores: {
    players: {
      autoIncrement: true,
      primaryKey: 'id'
    }
  }
};
