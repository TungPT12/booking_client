import axiosInstance from "../configs/axios/axios";
import setHeaders from "../utils/setHeaders";

const getNumberHotelInAreaApi = async (token, id) => {
    try {
        const response = await axiosInstance.get(`area/count-hotel/${id}`, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

const getNumberHotelInRandomAreaApi = async () => {
    try {
        const response = await axiosInstance.get(`/area/three-random/count-hotel`);
        return response;
    } catch (error) {
        return error.response;
    }
}

export {
    getNumberHotelInAreaApi,
    getNumberHotelInRandomAreaApi,
}