import axiosInstance from '../configs/axios/axios';

const uploadImageApi = async (formData) => {
    try {
        const response = axiosInstance.post('/upload', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        return response;
    } catch (error) {
        return error.response
    }
}

export default uploadImageApi;