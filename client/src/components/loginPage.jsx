import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const setCookie = (name, value, days) => {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${expirationDate.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

function LoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const responseJSON = await response.json();
        console.log(responseJSON);
        const { accessToken, refreshToken } = responseJSON.data;

        //TODO:  cookies section
        setCookie("refreshToken", refreshToken, 7);
        setCookie("accessToken", accessToken, 1);

        console.log("Login successful.");
        navigate("/create-post");
      } else {
        console.error("Error logging in.");
      }
    } catch (error) {
      console.error("Error logging in: ", error.message);
    }
  };

  return (
    <>
      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-96 p-8 bg-base-200 shadow-md">
          <h2 className="text-3xl font-bold mb-4">Login</h2>

          {/* Login form */}
          <form onSubmit={handleLogin}>
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
                  value={credentials.username}
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
                  value={credentials.password}
                  required
                />
              </div>

              {/* Submit button */}
              <div>
                <button type="submit" className="btn btn-primary w-full">
                  Login
                </button>
              </div>
              <p>
                Don&apos;t have an account.{" "}
                <Link to="/signup" className="text-blue-500">
                  Create new account.
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
