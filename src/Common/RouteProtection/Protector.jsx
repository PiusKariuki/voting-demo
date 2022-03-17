// import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { user } from "Common/recoil/user";
import Swal from "sweetalert2";

export const RequireAuth = ({ children }) => {
	const  token  = useRecoilValue(user);
	
	let location = useLocation();
	if (token?.length < 1 || token === undefined) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	return children;
};

export const AuthStatus = ({ children }) => {
	const token = useRecoilValue(user);
	let location = useLocation();

	if (token?.length > 1) {
		Swal.fire({
			icon: "info",
			title: "you are logged in😁",
			timer: 1500,
		});
		return <Navigate to="/admin/maps" state={{ from: location }} replace />;
	}

	return children;
};
