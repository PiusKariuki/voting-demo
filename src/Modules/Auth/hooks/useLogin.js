import { Axios } from "Common/http/http";
import { user } from "Common/recoil/user";
import  { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Swal from "sweetalert2";


const useLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [load, setLoad] = useState(false);
	const [formError, setFormError] = useState("");
	const setTkn = useSetRecoilState(user);
	let history = useHistory();

	const handleChange = (e) => {
		// setErrors("");
		switch (e.target.id) {
			case "email":
				setEmail(e.target.value);
				// let mail = e.target.value.toLowerCase();
				// if (mail.match(emailRegex)) setMailErrors("");
				// else {
				// 	setMailErrors("Invalid email");
				// }
				break;
			case "pass":
				setPassword(e.target.value);
				// if (!e.target.value.match(sixChars)) {
				// 	setPassErrors("Password should be atleast six characters long");
				// } else {
				// 	setPassErrors("");
				// }
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
			history.push("/admin/maps");
		} catch (e) {
			setFormError(e?.response?.data);
			setLoad(false);
		}
	};
	return { email, password, handleChange, load,login,formError };
};

export default useLogin;
