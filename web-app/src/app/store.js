import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducers from '../redux'
import sagas from '../sagas'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]
const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose
const enhancers = [applyMiddleware(...middleware)]

export default createStore(
  combineReducers(rootReducers),
  undefined,
  composeEnhancers(...enhancers)
)

sagas.map(sagaMiddleware.run)
