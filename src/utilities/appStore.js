import {
  createBrowserHistory
} from 'history';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
  routerMiddleware
} from 'connected-react-router';
import createRootReducer from '../reducers';
export const history = createBrowserHistory();

export const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, routerMiddleware(history)];

if (!process.env.isProd) {
  const {
    logger
  } = require('redux-logger');
  // middlewares.push(logger);
}

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(applyMiddleware(...middlewares))
  );

  return store;
}