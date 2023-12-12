import axios from 'axios';

const createAxiosInstance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default createAxiosInstance;