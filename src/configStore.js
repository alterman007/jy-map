import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { composeWithDevTools as composeDTD } from 'redux-devtools-extension';
import { composeWithDevTools as composeDTP } from 'redux-devtools-extension/logOnlyInProduction';

import { isDev } from './constants/env';

const devToolOpt = {};
const composeEnhancers = isDev ? composeDTD(devToolOpt) : composeDTP(devToolOpt);
const sagaMiddleware = createSagaMiddleware();

function configStore(reducer, rootSaga) {
  const reduxMiddlewareArr = [sagaMiddleware];

  const store = createStore(reducer, composeEnhancers(applyMiddleware(...reduxMiddlewareArr)));
  sagaMiddleware.run(rootSaga);

  return store;
}

export default configStore;
