import axios from 'axios';

const api = axios.create({
    baseURL: 'https://dev.api.prodigioeducacao.com/v1/',
});

export default api;