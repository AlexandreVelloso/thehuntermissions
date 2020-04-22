const prod = {
    baseURL: '/api',
};

const dev = {
    baseURL: 'http://localhost:3333/api',
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;