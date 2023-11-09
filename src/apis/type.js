import axiosInstance from "../configs/axios/axios";
import setHeaders from "../utils/setHeaders";

const getNumberHotelByTypeApi = async (token, id) => {
    try {
        const response = await axiosInstance.get(`type/count-hotel/${id}`, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

export {
    getNumberHotelByTypeApi,
}