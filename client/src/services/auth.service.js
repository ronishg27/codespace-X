import { API_URL } from "../utils/constants";

// methods for cookies
const handleClearCookies = () => {
	// Clear all cookies
	document.cookie.split(";").forEach((c) => {
		document.cookie = c
			.replace(/^ +/, "")
			.replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
	});
};

const authService = {
	login: async ({ username, password }) => {
		try {
			const response = await fetch(`${API_URL}/users/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					password,
				}),
			});
			console.log(username, password);
			// console.log("response: ", response);
			// console.log("json response: ", await response.json());

			// ! json-response doesn't contain response.ok
			// ! only one time response is parsed(using .json())
			if (response.ok) {
				return await response.json();
			} else {
				console.log("Login failed, error: ", await response.json());
			}
		} catch (error) {
			console.log("Auth Services Error:: Login :: ", error);
		}
		return false;
	},
	signup: async (user) => {
		try {
			const response = await fetch(`${API_URL}/users/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});

			if (response.ok) {
				console.log(user);
				return await response.json();
			}
			console.log("Registration failed. error: ", await response.json());
		} catch (error) {
			console.log("Auth Services Error:: Signup :: ", error);
		}
		return false;
	},
	logout: async (accessToken) => {
		try {
			const response = await fetch(`${API_URL}/users/logout`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			});
			if (response.ok) {
				handleClearCookies();
				console.log("Logout Successful");
				return await response.json();
			}
			console.log("Logout failed. error: ", await response.json());
		} catch (error) {
			console.log("Auth Services Error:: Logout :: ", error);
		}
		return false;
	},
	refreshToken: async (refreshToken) => {
		try {
			const response = await fetch(`${API_URL}/users/refresh-token`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					refreshToken,
				}),
			});
			if (response.ok) {
				console.log("Access Token refreshed  Successfully");
				return await response.json();
			} else {
				console.log("Error while refreshing token");
				console.log(await response.json());
			}
		} catch (error) {
			console.log("Auth Services Error :: refreshToken :: ", error);
		}
		return false;
	},

	getUser: async (username) => {
		try {
			const response = await fetch(`${API_URL}/users/c/${username}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				console.log("User Fetched Successfully");
				return await response.json();
			} else {
				console.log("Failed to get user.");
				console.log(await response.json());
			}
		} catch (error) {
			console.log("Auth Services Error:: getUser :: ", error);
		}

		return false;
	},
};

export default authService;
