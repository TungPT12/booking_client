import axios from 'axios';

const login = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:5000/api/login', {
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
        const response = await axios.post('http://localhost:5000/api/access-token', {
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