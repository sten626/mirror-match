import { DbSchema } from './database.service';

const schema: DbSchema = {
  version: 1,
  name: 'mirror-match',
  stores: new Map([
    ['player', {
      autoIncrement: true
    }]
  ])
};

export function getSchema(): DbSchema {
  return schema;
}
