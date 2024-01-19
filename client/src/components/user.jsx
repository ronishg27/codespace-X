import { Route, Routes, useNavigate } from "react-router-dom";
import ForumPost from "./forumPost";
import ForumPostForm from "./forumPostForm";
import Profile from "./profile";
import isLoggedIn from "../utils/loggedInCheck";
import { useEffect } from "react";
import Sidebar from "./sidebar";

const User = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoggedIn()) {
			// Redirect to the login page or another route if the user is not logged in
			navigate("/a");
		}
	}, [navigate]);

	return (
		<>
			<Sidebar>
				<Routes>
					<Route path="/" element={<ForumPost />} />
					<Route path="/create-post" element={<ForumPostForm />} />
					<Route path="/profile/:username" element={<Profile />} />
				</Routes>
			</Sidebar>
		</>
	);
};

export default User;
