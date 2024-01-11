// This component handles user logoff.

import { useEffect } from "react";
import { logout } from "../../fetching/local";
import { useNavigate } from "react-router-dom";

export default function Logout({ token, setToken }) {
	const nav = useNavigate();

	useEffect(() => {
		logout();
		localStorage.removeItem("token");
		localStorage.removeItem("userId");
		localStorage.removeItem("genreSelect");
		setToken(null);
		nav("/");
	}, []);
}
