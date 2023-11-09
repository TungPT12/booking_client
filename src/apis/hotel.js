import axiosInstance from "../configs/axios/axios";
import setHeaders from "../utils/setHeaders";

const getTopThreeRatingHotel = async (token) => {
    try {
        const response = await axiosInstance.get(`/hotels/top-three`, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

const getHotelByIdApi = async (token, id) => {
    try {
        const startDate = new Date();
        const response = await axiosInstance.get(`/hotel/${id}?startDate=${startDate}`, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

export {
    getTopThreeRatingHotel,
    getHotelByIdApi,
}