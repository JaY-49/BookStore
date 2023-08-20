import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api"

class cartService {


    AddItemToCart = async (payload) => {
        console.log(payload);
        return axios.post(`${BASEURL}/cart`, payload);
    }

    GetCartList = async (id) => {
        return axios.get(`${BASEURL}/cart?userId=${id}`);
    }

    UpdateItem = async (payload) => {
        return axios.put(`${BASEURL}/cart`, payload);
    }

    DeleteItem = async (id) => {
        return axios.delete(`${BASEURL}/cart?id=${id}`);
    }

    ConfirmOrder = async (payload) => {
        return axios.post(`${BASEURL}/order`, payload);
    }
}

export default new cartService();