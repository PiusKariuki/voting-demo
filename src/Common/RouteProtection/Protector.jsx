// import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { user } from "Common/recoil/user";
import Swal from "sweetalert2";

export const RequireAuth = ({ children }) => {
	const { token } = useRecoilValue(user);
	let history = useHistory();

	let location = useLocation();
	if (token?.length < 1 || token === undefined) {
		return history.push("auth/login");

		// <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
};

export const AuthStatus = ({ children }) => {
	const userObj = useRecoilValue(user);
	let location = useLocation();
	let history = useHistory();

	if (userObj?.token?.length > 1) {
		Swal.fire({
			icon: "info",
			title: "you are logged in😁",
			timer: 1500,
		});
		return history.replace("/admin/map");
		// <Navigate to="/" state={{ from: location }} replace />;
	}

	return children;
};
