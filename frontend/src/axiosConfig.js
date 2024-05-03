import axios from "axios";

export const axiosClient = axios.create({
    // baseURL: "https://wearying-networks.000webhostapp.com"
    baseURL: "https://scandiweb-test-production.up.railway.app"
})