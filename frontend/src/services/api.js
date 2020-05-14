import axios from 'axios';

import { config } from '../contants';

const api = axios.create({
    baseURL: config.baseURL,
});

api.interceptors.response.use((response) => response, (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = window.localStorage.getItem('refreshToken');
        return axios.post(`${config.baseURL}/auth/refresh`, { refreshToken })
            .then(({ data }) => {
                window.localStorage.setItem('accessToken', data.accessToken);
                window.localStorage.setItem('refreshToken', data.refreshToken);
                axios.defaults.headers.common['Authorization'] = data.accessToken;
                originalRequest.headers['Authorization'] = data.accessToken;
                return axios(originalRequest);
            })
    }

    return Promise.reject(error);
});

export default api;