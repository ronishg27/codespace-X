/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import Navbar from "./components/navbar";
// import ForumPostForm from "./components/forumPostForm";
// import ForumPost from "./components/forumPost";
// import LoginPage from "./components/loginPage";
// import SignupPage from "./components/signupPage";
// import Profile from "./components/profile";

import {
	Navbar,
	ForumPost,
	ForumPostForm,
	LoginPage,
	SignupPage,
} from "./index.js";

function App() {
	return (
		<>
			<Navbar />
			<Router>
				<Routes>
					<Route path="/" element={<SignupPage />} />
					<Route path="/signup" element={<SignupPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/create-post" element={<ForumPostForm />} />
					<Route path="/feed" element={<ForumPost />} />
					{/* <Route path="/profile" element={<Profile />} /> */}
				</Routes>
			</Router>
		</>
	);
}

export default App;
