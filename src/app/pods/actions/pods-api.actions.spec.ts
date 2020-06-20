import * as fromPodsApi from './pods-api.actions';

describe('loadPodsApis', () => {
  it('should return an action', () => {
    expect(fromPodsApi.loadPodsApis().type).toBe('[PodsApi] Load PodsApis');
  });
});
