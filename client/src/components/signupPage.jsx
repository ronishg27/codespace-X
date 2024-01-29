import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import authService from "../services/auth.service";
import isLoggedIn from "../utils/loggedInCheck";
import toast from "react-hot-toast";

function SignupPage() {
	const navigate = useNavigate();
	const [user, setUser] = useState({
		email: "",
		username: "",
		password: "",
		fullname: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser({
			...user,
			[name]: value,
		});
	};

	// const handleSignup = async (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		const response = await fetch(
	// 			"http://localhost:8080/api/v1/users/register",
	// 			{
	// 				method: "POST",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 				body: JSON.stringify(user),
	// 			}
	// 		);

	// 		if (response.ok) {
	// 			console.log("Signup successful.");
	// 			navigate("/a");
	// 		} else {
	// 			console.log("Error registering. Status:", response.status);
	// 			// Try to log the response body for more details
	// 			const errorData = await response.json();
	// 			console.log("Error data:", errorData);
	// 		}
	// 	} catch (error) {
	// 		console.error("Error signing up: ", error.message);
	// 	}
	// };

	const registerNotify = () => {
		toast.success("Signup Successful");
	};
	const signupFailedNotify = () => {
		toast.error("Failed to Signup");
	};

	const handleSignup = async (e) => {
		e.preventDefault();
		const response = authService.signup(user);
		if (response) {
			registerNotify();
			console.log("Signup successful.");
			navigate("/a");
		} else {
			signupFailedNotify();
		}
	};
	if (isLoggedIn()) {
		navigate("/u");
	}
	return (
		<>
			{/* Main content area */}
			<div className="flex-1 flex items-center justify-center">
				<div className="w-96 p-8 bg-base-200 shadow-md">
					<h2 className="text-3xl font-bold mb-4">Signup</h2>

					{/* Login form */}
					<form onSubmit={handleSignup}>
						<div className="space-y-4">
							{/* Username field */}
							<div>
								<label htmlFor="username" className="label">
									Username
								</label>
								<input
									type="text"
									id="username"
									name="username"
									className="input input-bordered w-full"
									placeholder="Enter your username"
									onChange={handleChange}
									value={user.username}
									required
								/>
							</div>
							{/* fullname field */}
							<div>
								<label htmlFor="fullname" className="label">
									Full Name
								</label>
								<input
									type="text"
									id="fullname"
									name="fullname"
									className="input input-bordered w-full"
									placeholder="Enter your full name"
									onChange={handleChange}
									value={user.fullname}
									required
								/>
							</div>
							{/* email field */}
							<div>
								<label htmlFor="email" className="label">
									Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									className="input input-bordered w-full"
									placeholder="Enter your email"
									onChange={handleChange}
									value={user.email}
									required
								/>
							</div>

							{/* Password field */}
							<div>
								<label htmlFor="password" className="label">
									Password
								</label>
								<input
									type="password"
									id="password"
									name="password"
									autoComplete="off"
									className="input input-bordered w-full"
									placeholder="Enter your password"
									onChange={handleChange}
									value={user.password}
									required
								/>
							</div>

							{/* Submit button */}
							<div>
								<button
									type="submit"
									className="btn btn-primary w-full"
								>
									Signup
								</button>
							</div>
							<p>
								Already have account?{" "}
								<Link to="/a" className="text-blue-500">
									Login instead.
								</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default SignupPage;
