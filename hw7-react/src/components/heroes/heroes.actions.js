export const actionTypes = {
  HERO_UPDATE: 'HERO_UPDATE',
  HERO_ADD: 'HERO_ADD',
  HERO_DELETE: 'HERO_DELETE',
};

export const updateHero = hero => ({
  type: actionTypes.HERO_UPDATE,
  hero,
});

export const addHero = hero => ({
  type: actionTypes.HERO_ADD,
  hero,
});

export const deleteHero = id => ({
  type: actionTypes.HERO_DELETE,
  id,
});
