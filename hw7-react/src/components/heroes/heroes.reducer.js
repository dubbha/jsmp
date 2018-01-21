export const initialState = [
    { id: 11, name: 'React' },
    { id: 12, name: 'Component' },
    { id: 13, name: 'State' },
    { id: 14, name: 'Router' },
    { id: 15, name: 'Redux' },
    { id: 16, name: 'Action' },
    { id: 17, name: 'Reducer' },
    { id: 18, name: 'Store' },
    { id: 19, name: 'Connect' },
    { id: 20, name: 'Provider' },
];

const heroesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HERO_ADD':
      return [...state, { ...action.hero }];
    case 'HERO_UPDATE':
      return state.map(el => (el.id === action.hero.id ? { ...action.hero } : el));
    case 'HERO_DELETE':
      return state.filter(el => el.id !== action.id);
    default:
      return state;
  }
};

export default heroesReducer;
