import axios from 'axios';

const axiosCustomerInstance = axios.create({
    baseURL: 'http://localhost:5000/api/',
    // headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('bookingToken') ? localStorage.getItem('bookingToken') : ""}`
    // }
});

export default axiosCustomerInstance;