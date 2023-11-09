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

export {
    getNumberHotelInAreaApi,
}