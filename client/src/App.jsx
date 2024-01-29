import {
	Routes,
	Route,
	BrowserRouter as Router,
	// Outlet,
} from "react-router-dom";

import { Navbar, SignupPage } from "./index.js";
import Account from "./components/account.jsx";
import User from "./components/user.jsx";
import NotFound from "./components/notFound.jsx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./services/auth.service.js";
import { login, logout } from "./store/authSlice.js";

function App() {
	// eslint-disable-next-line no-unused-vars
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		authService
			.getUser()
			.then((userData) => {
				if (userData) {
					dispatch(login({ userData }));
				} else {
					dispatch(logout());
				}
			})
			.finally(() => setLoading(false));
	});

	return (
		<>
			<Navbar />

			{/* <Outlet /> */}

			<Router>
				<Routes>
					<Route path="/" element={<SignupPage />} />
					<Route path="/a/*" element={<Account />} />
					<Route path="/u/*" element={<User />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
