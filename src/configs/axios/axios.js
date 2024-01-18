import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/',
    // baseURL: 'https://booking-server-gafr.onrender.com/api/',
});

export default axiosInstance;