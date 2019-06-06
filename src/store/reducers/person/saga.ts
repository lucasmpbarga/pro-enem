import { call, put } from 'redux-saga/effects';
import api from '../../../services/api';
import { personFailure, personSuccess } from './actions';
import { PersonTypes } from './types';

interface AuthenticateRequestAction {
    type: PersonTypes.PERSON_SUCCESS;
    payload: number;
}

export function* personRequest(action: AuthenticateRequestAction) {
    try {
        const response = yield call(api.get, `person/${action.payload}`);
        yield put(personSuccess(response.data));
    } catch (error) {
        yield put(personFailure());
    }
};