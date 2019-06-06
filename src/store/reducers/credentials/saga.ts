import { call, put } from 'redux-saga/effects';
import { ILogin } from '../../../models/ILogin';
import api from '../../../services/api';
import { authenticateFailure, authenticateSuccess } from './actions';
import { CredentialsTypes } from './types';

interface AuthenticateRequestAction {
    type: CredentialsTypes.AUTHENTICATE_SUCCESS;
    payload: ILogin;
}

export function* authenticateRequest(action: AuthenticateRequestAction) {
    try {
        const response = yield call(api.post, 'token', action.payload);
        yield put(authenticateSuccess(response.data.credentials));
    } catch (error) {
        yield put(authenticateFailure());
    }
};