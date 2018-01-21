import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import rootReducer from './rootReducer';

const initialState = {};

export default () => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      autoRehydrate(),
      devToolsEnhancer(),
    ),
  );

  persistStore(store, { whitelist: ['heroes'] });
  return store;
};
