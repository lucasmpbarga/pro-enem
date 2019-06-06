import { all, takeLatest } from 'redux-saga/effects';
import { authenticateRequest } from './credentials/saga';
import { CredentialsTypes } from './credentials/types';

export default function* rootSaga() {
    return yield all([
        takeLatest(CredentialsTypes.AUTHENTICATE_REQUEST, authenticateRequest),
    ]);
}