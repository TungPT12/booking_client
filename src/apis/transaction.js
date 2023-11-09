import axiosCustomerInstance from "../configs/axios/customer";
import setHeaders from "../utils/setHeaders";

const createTransactionApi = async (token, transactionData) => {
    try {
        const response = await axiosCustomerInstance.post(`/transaction`, transactionData, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}

const getTransactionsApi = async (token) => {
    try {
        const response = await axiosCustomerInstance.get(`/transactions`, setHeaders(token));
        return response;
    } catch (error) {
        return error.response;
    }
}
export {
    createTransactionApi,
    getTransactionsApi,
}