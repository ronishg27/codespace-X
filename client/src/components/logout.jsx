import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const getCookie = (name) => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(";").shift();
};

// const handleClearCookies = () => {
// 	// Clear all cookies
// 	document.cookie.split(";").forEach((c) => {
// 		document.cookie = c
// 			.replace(/^ +/, "")
// 			.replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
// 	});
// };

export const Logout = () => {
	const navigate = useNavigate();
	const accessToken = getCookie("accessToken");
	useEffect(() => {
		if (!accessToken) {
			navigate("/a");
			// throw new Error("Access Token not found.");
		}
	}, [accessToken, navigate]);

	// const handleLogout = async (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		const response = await fetch(
	// 			"http://localhost:8080/api/v1/users/logout",
	// 			{
	// 				method: "POST",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 					Authorization: `Bearer ${accessToken}`,
	// 				},
	// 			}
	// 		);
	// 		if (response.ok) {
	// 			handleClearCookies();
	// 			console.log("Logout successful.");
	// 			navigate("/a");
	// 		} else {
	// 			const errorData = await response.json();
	// 			console.error("Error logging out. ", errorData);
	// 		}
	// 	} catch (error) {
	// 		console.log("Error logging out. Error message: ", error.message);
	// 	}
	// };

	const handleLogout = async (e) => {
		e.preventDefault();
		const response = authService.logout(accessToken);
		if (response) {
			console.log("Logout successful.");
			navigate("/a");
		}
	};

	return (
		<Button variant="outlined" onClick={handleLogout}>
			Logout
		</Button>
	);
};
