import { Navigate } from "react-router-dom";
import Button from "@mui/material/Button";

const getCookie = (name) => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(";").shift();
};

export const Logout = () => {
	const accessToken = getCookie("accessToken");
	const handleLogout = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				"http://localhost:8080/api/v1/users/logout",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			if (response.ok) {
				console.log("Logout successful.");
				Navigate("/signup");
			} else {
				const errorData = await response.json();
				console.error("Error logging out. ", errorData);
			}
		} catch (error) {
			console.log("Error logging out. Error message: ", error.message);
		}
	};

	return (
		<Button variant="contained" onClick={handleLogout}>
			Logout
		</Button>
	);
};
