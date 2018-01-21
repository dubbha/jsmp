import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import configureStore from 'configureStore';

jest.mock('redux', () => ({
  createStore: jest.fn(),
  applyMiddleware: jest.fn(),
  compose: jest.fn(),
}));

jest.mock('redux-thunk', () => jest.fn(() => 'thunk'));

jest.mock('redux-persist', () => ({
  persistStore: jest.fn(),
  autoRehydrate: jest.fn(),
}));

jest.mock('redux-devtools-extension/logOnlyInProduction', () => ({
  devToolsEnhancer: jest.fn(),
}));

jest.mock('rootReducer', () => jest.fn(() => 'rootReducer'));

describe('configureStore', () => {
  configureStore();

  it('should call createStore from redux', () => {
    expect(createStore).toBeCalled();
  });

  it('should call applyMiddleware from redux', () => {
    expect(applyMiddleware).toBeCalled();
  });

  it('should call compose from redux', () => {
    expect(compose).toBeCalled();
  });

  it('should call persistStore from redux-persist', () => {
    expect(persistStore).toBeCalled();
  });

  it('should call autoRehydrate from redux-persist', () => {
    expect(autoRehydrate).toBeCalled();
  });
});
