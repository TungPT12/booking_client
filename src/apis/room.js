import axiosInstance from "../configs/axios/axios";
import setHeaders from "../utils/setHeaders";

const getRoomByHotelId = async (token, hotelId, startDate, endDate) => {
    try {
        const response = await axiosInstance.get(`/rooms/validRooms/${hotelId}?startDate=${startDate}&endDate=${endDate}`, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

export {
    getRoomByHotelId,
}