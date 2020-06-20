import * as fromPodsPage from './pods-page.actions';

describe('loadPodsPages', () => {
  it('should return an action', () => {
    expect(fromPodsPage.loadPodsPages().type).toBe('[PodsPage] Load PodsPages');
  });
});
