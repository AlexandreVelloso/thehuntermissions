import axios from 'axios';

import { config } from '../contants';

const api = axios.create({
    baseURL: config.baseURL,
});

api.interceptors.response.use((response) => response, (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = window.localStorage.getItem('refresh_token');
        return axios.post(`${config.baseURL}/auth/refresh`, { refresh_token: refreshToken })
            .then(({ data }) => {
                window.localStorage.setItem('access_token', data.access_token);
                window.localStorage.setItem('refresh_token', data.refresh_token);
                axios.defaults.headers.common['Authorization'] = data.access_token;
                originalRequest.headers['Authorization'] = data.access_token;
                return axios(originalRequest);
            })
    }

    return Promise.reject(error);
});

export default api;