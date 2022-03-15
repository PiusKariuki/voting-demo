import axios from "axios";

export const baseUrl = "http://127.0.0.1:3001/api/";
export const socketUrl = "ws://127.0.0.1:3001";

export const Axios = axios.create({
	baseURL: baseUrl,
});
