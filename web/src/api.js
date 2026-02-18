import axios from "axios";

const API = axios.create({
    baseURL: "https://marketplace-backend-ezd4.onrender.com"
});

export default API;