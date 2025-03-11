import axios from "axios";
import { BASE_URL } from "./constants";

const axioInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: {
        "Content-type": "application/json",
    },
});

axioInstance.interceptors.request.use(
    (config) => {
        const accesToken = localStorage.getItem("token");
        if(accesToken) {
            config.headers.Authorization = `Bearer ${accesToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axioInstance;