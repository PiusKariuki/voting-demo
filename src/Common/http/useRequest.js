import axios from "axios";
import { useRecoilValue } from "recoil";
import { user } from "shared/recoil/user";
import { baseUrl } from "./http";

const useRequest = () => {
	const userObj = useRecoilValue(user);
	const tkn = userObj?.token;

	const Axios = axios.create({
		baseURL: baseUrl,
	});

	Axios.interceptors.request.use((request) => {
		request.headers.Authorization = `Bearer ${tkn}`;
		return request;
	});

	return { Axios };
};

export default useRequest;
