import createSagaMiddleware from '@redux-saga/core';
import { applyMiddleware, createStore, Store } from 'redux';
import { CredentialsState } from './reducers/credentials/types';
import rootReducer from './reducers/rootReducers';
import rootSaga from './reducers/rootSaga';

export interface ApplicationState {
    credentials: CredentialsState
}

const sagaMiddleware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;