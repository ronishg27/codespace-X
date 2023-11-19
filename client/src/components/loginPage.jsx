function LoginPage() {
  return (
    <>
      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-96 p-8 bg-base-200 shadow-md">
          <h2 className="text-3xl font-bold mb-4">Login</h2>

          {/* Login form */}
          <form>
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
                  required
                />
              </div>

              {/* Submit button */}
              <div>
                <button type="submit" className="btn btn-primary w-full">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
