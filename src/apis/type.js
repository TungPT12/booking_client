import axiosInstance from "../configs/axios/axios";

const getNumberHotelByTypeApi = async () => {
    try {
        const response = await axiosInstance.get(`type/count-hotel`,);
        return response;
    } catch (error) {
        return error.response;
    }
}

export {
    getNumberHotelByTypeApi,
}