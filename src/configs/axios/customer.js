import axios from 'axios';

const axiosCustomerInstance = axios.create({
    baseURL: 'http://localhost:5000/api/',
    // baseURL: 'https://booking-server-gafr.onrender.com/api/',
});

export default axiosCustomerInstance;