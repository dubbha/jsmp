import { combineReducers } from 'redux';
import heroes from './components/heroes/heroes.reducer';

export default combineReducers({
  heroes,
});