import { Hw6AngularPage } from './app.po';

describe('hw6-angular App', () => {
  let page: Hw6AngularPage;

  beforeEach(() => {
    page = new Hw6AngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
