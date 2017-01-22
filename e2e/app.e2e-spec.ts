import { MirrorMatchPage } from './app.po';

describe('mirror-match App', function() {
  let page: MirrorMatchPage;

  beforeEach(() => {
    page = new MirrorMatchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
