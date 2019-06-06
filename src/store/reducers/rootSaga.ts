import { all, takeLatest } from 'redux-saga/effects';
import { authenticateRequest } from './credentials/saga';
import { CredentialsTypes } from './credentials/types';
import { personRequest } from './person/saga';
import { PersonTypes } from './person/types';

export default function* rootSaga() {
    return yield all([
        takeLatest(CredentialsTypes.AUTHENTICATE_REQUEST, authenticateRequest),
        takeLatest(PersonTypes.PERSON_REQUEST, personRequest),
    ]);
}