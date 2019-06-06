import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AsyncStorage } from 'react-native';

const api = axios.create({
    baseURL: 'https://dev.api.prodigioeducacao.com/v1/',
});

api.interceptors.response.use((response: AxiosResponse<{ token: string }>) => {
    if (response.data.token) {
        setAuthorization(response.data.token);
    }
    return response;
});

api.interceptors.request.use(async (requestConfig: AxiosRequestConfig) => {
    const token: string = await getAuth() || '';
    if (token) {
        requestConfig.headers.authorization = token;
    }
    return requestConfig;
});

let bearerAuthorization: string;

const setAuthorization = (authorization: string) => {
    bearerAuthorization = `Bearer ${authorization}`;
    AsyncStorage.setItem('bearerAuthorization', bearerAuthorization);
};

const getAuth = (): string | Promise<string | null> => {
    return bearerAuthorization || AsyncStorage.getItem('bearerAuthorization');
};

export default api;