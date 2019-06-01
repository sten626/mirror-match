import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Pairing } from 'app/shared';

export interface State extends EntityState<Pairing> {}

export const adapter: EntityAdapter<Pairing> = createEntityAdapter<Pairing>({});

export const initialState: State = adapter.getInitialState({});

export function reducer(
  state = initialState,
  action
): State {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
