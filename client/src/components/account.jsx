import { Route, Routes, useNavigate } from "react-router-dom";

import LoginPage from "./loginPage";
import SignupPage from "./signupPage";
import isLoggedIn from "../utils/loggedInCheck";
import { useEffect } from "react";

const Account = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn()) {
			// Redirect to the login page or another route if the user is not logged in
			navigate("/u");
		}
	}, [navigate]);

	return (
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<SignupPage />} />
		</Routes>
	);
};

export default Account;
