import { action } from 'typesafe-actions';
import { ILogin } from '../../../models/ILogin';
import { Credentials, CredentialsTypes } from './types';

export const authenticateRequest = (data: ILogin) => action(CredentialsTypes.AUTHENTICATE_REQUEST, data);
export const authenticateSuccess = (data: Credentials) => action(CredentialsTypes.AUTHENTICATE_SUCCESS, data);
export const authenticateFailure = () => action(CredentialsTypes.AUTHENTICATE_FAILURE);
export const authenticateClear = () => action(CredentialsTypes.AUTHENTICATE_CLEAR);
