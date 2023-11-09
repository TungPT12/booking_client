import axiosInstance from "../configs/axios/axios";
const register = async (user) => {
    try {
        const response = await axiosInstance.post(`/signup`, user);
        return response;
    } catch (error) {
        return error.response;
    }
}

export {
    register
}