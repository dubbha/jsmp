import * as selectors from 'components/heroes/heroes.selectors';

describe('heroes.selectors', () => {
  describe('heroesSelector', () => {
    it('should select all heroes', () => {
      const state = {
        heroes: [
          { id: 1, name: 'Optimus Uno' },
          { id: 2, name: 'Optimus Duos' },
          { id: 3, name: 'Optimus Tres' },
        ],
        otherPartOfState: { prop: 'val' },
      };
      expect(selectors.heroesSelector(state)).toEqual([
        { id: 1, name: 'Optimus Uno' },
        { id: 2, name: 'Optimus Duos' },
        { id: 3, name: 'Optimus Tres' },
      ]);
    });
  });

  describe('heroIdSelector', () => {
    it('should get hero id from router params', () => {
      const state = {};
      const props = { match: { params: { id: 123 } } };
      expect(selectors.heroIdSelector(state, props)).toEqual(123);
    });
  });

  describe('heroSelector', () => {
    it('should select a hero based on router params', () => {
      const state = {
        heroes: [
          { id: 1, name: 'Optimus Uno' },
          { id: 2, name: 'Optimus Duos' },
          { id: 3, name: 'Optimus Tres' },
        ],
        otherPartOfState: { prop: 'val' },
      };
      const props = { match: { params: { id: 2 } } };

      expect(selectors.heroSelector(state, props))
        .toEqual({ id: 2, name: 'Optimus Duos' });
    });
  });

  describe('heroReselector', () => {
    it('should select a hero based on router params using memoized selector', () => {
      const state = {
        heroes: [
          { id: 1, name: 'Optimus Uno' },
          { id: 2, name: 'Optimus Duos' },
          { id: 3, name: 'Optimus Tres' },
        ],
        otherPartOfState: { prop: 'val' },
      };
      const props = { match: { params: { id: 2 } } };

      expect(selectors.heroReselector(state, props))
        .toEqual({ id: 2, name: 'Optimus Duos' });
    });
  });
});
