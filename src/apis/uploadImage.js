import axios from 'axios';

const uploadImageApi = async (formData) => {
    try {
        const response = axios.post('http://localhost:5000/api/upload', formData, {
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