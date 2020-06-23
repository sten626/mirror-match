import * as fromPodsPage from './pods-page.actions';

describe('enter', () => {
  it('should return an action', () => {
    expect(fromPodsPage.enter().type).toBe('[Pods Page] Enter');
  });
});
