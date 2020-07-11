import * as fromPodsApi from './pods-api.actions';

describe('createDraftPods', () => {
  it('should return an action', () => {
    expect(fromPodsApi.createDraftPods().type).toBe(
      '[Pods/API] Create Draft Pods'
    );
  });
});
