import axios from 'axios';

const createAxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default createAxiosInstance;