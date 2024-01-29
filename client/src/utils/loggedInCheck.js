// Function to check if the user is logged in using cookies

function isLoggedIn() {
	// Retrieve the "accessToken" cookie value

	// try {
	const isLoggedInCookie = document.cookie
		.split("; ")
		.find((row) => row.startsWith("accessToken="));

	// Check if the "isLoggedIn" cookie exists and its value is "true"
	return isLoggedInCookie ? true : false;
	// } catch (error) {
	// 	console.log("accessToken not found...");
	// } 
}

// Example usage

export default isLoggedIn;
