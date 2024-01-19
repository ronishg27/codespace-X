import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import { Navbar, SignupPage } from "./index.js";
import Account from "./components/account.jsx";
import User from "./components/user.jsx";

import NotFound from "./components/notFound.jsx";

function App() {
	return (
		<>
			<Navbar />

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
