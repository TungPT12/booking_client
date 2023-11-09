import axiosCustomerInstance from '../configs/axios/customer';

const login = async (username, password) => {
    try {
        const response = await axiosCustomerInstance.post('/login', {
            username: username,
            password: password
        });
        return response
    } catch (error) {
        return error.response;
    }
}

const checkAccessToken = async (token) => {
    try {
        const response = await axiosCustomerInstance.post('/access-token', {
            token: token,
        });
        return response
    } catch (error) {
        return error.response;
    }
}

export {
    login,
    checkAccessToken
}