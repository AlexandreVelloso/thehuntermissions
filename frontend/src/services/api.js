import axios from 'axios';

import { config } from '../contants';

const api = axios.create({
    baseURL: config.baseURL,
});

export default api;