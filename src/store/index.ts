import createSagaMiddleware from '@redux-saga/core';
import { applyMiddleware, createStore, Store } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { CredentialsState } from './reducers/credentials/types';
import { PersonState } from './reducers/person/types';
import rootReducer from './reducers/rootReducers';
import rootSaga from './reducers/rootSaga';

export interface ApplicationState {
    credentials: CredentialsState,
    person: PersonState,
}

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store: Store<ApplicationState> = createStore(
    persistedReducer,
    applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store)

export { store, persistor };

