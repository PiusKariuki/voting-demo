import { Axios } from "Common/http/http";
import { useState } from "react";
import Swal from "sweetalert2";

const useMap = () => {
	const [votes, setVotes] = useState([]);
	const getVotes = async () => {
		try {
			let { data } = await Axios.get("/polls/votes");
			setVotes(data);
		} catch (error) {
			Swal.fire({
				icon: "error",
				text: error.response.data,
			});
		}
	};
	return {getVotes,votes};
};

export default useMap;
