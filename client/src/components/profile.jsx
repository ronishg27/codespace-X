/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
	const [userData, setUserData] = useState(null);
	const { username } = useParams();

	// Function to get a cookie value by name
	function getCookie(name) {
		const cookieValue = document.cookie
			.split("; ")
			.find((row) => row.startsWith(name))
			?.split("=")[1];

		return cookieValue || "";
	}

	useEffect(() => {
		(async () => {
			try {
				const accessToken = getCookie("accessToken");
				const response = await fetch(
					`http://localhost:8080/api/v1/users/c/${username}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error("Error while fetching the user details");
				}

				// Convert the response to JSON
				const jsonData = await response.json();
				console.log("JSON Data:", jsonData.data);
				setUserData(jsonData.data);
			} catch (error) {
				throw new Error(error.message);
			}
		})();
	}, [username]);
	return (
		<>
			<div className="card w-96 bg-base-200 shadow-xl m-auto ">
				<div className="card-body mx-5 my-2">
					<h2 className="card-title text-3xl py-4">User Profile</h2>
					<li>
						<span className="font-bold">Username: {userData?.username}</span>
					</li>
					<li>
						<span className="font-bold">Email: {userData?.email}</span>
					</li>
					<li>
						<span className="font-bold">Full Name: {userData?.fullname}</span>
					</li>
					<li>
						<span className="font-bold">Post count: {userData?.postCount}</span>
					</li>
				</div>
			</div>
		</>
	);
};

export default Profile;
