import * as actions from 'components/heroes/heroes.actions';

describe('heroes.actions', () => {
  it('should update a hero', () => {
    const hero = { id: 1, name: 'Primus' };
    expect(actions.updateHero(hero)).toEqual({
      type: actions.actionTypes.HERO_UPDATE,
      hero
    });
  });

  it('should add a hero', () => {
    const hero = { id: 1, name: 'Primus' };
    expect(actions.addHero(hero)).toEqual({
      type: actions.actionTypes.HERO_ADD,
      hero
    });
  });

  it('should delete a hero by id', () => {
    const id = 2;
    expect(actions.deleteHero(id)).toEqual({
      type: actions.actionTypes.HERO_DELETE,
      id
    });
  });
});
