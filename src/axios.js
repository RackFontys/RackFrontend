import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5283', // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt'); // Replace 'jwt' with the key where your token is stored
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;