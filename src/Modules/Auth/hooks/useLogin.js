import { Axios } from "Common/http/http";
import { user } from "Common/recoil/user";
import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Swal from "sweetalert2";


const useLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [load, setLoad] = useState(false);
	const [formError, setFormError] = useState("");
	const setTkn = useSetRecoilState(user);
	let navigate = useNavigate();

	const handleChange = (e) => {
		switch (e.target.id) {
			case "email":
				setEmail(e.target.value);
				break;
			case "pass":
				setPassword(e.target.value);
				break;
			default:
				Swal.fire({
					icon: "error",
					text: "Invalid credentials",
				});
		}
	};

	const login = async (e) => {
		e.preventDefault();
		setLoad(true);
		setFormError("");
		try {
			const { data } = await Axios.post("/auth/signin", {
				email: email,
				password: password,
			});
			setTkn(prev => data);
			setLoad(false);
			setFormError("");
			navigate("/admin/maps");
		} catch (e) {
			setFormError(e?.response?.data);
			setLoad(false);
		}
	};
	return { email, password, handleChange, load,login,formError };
};

export default useLogin;
