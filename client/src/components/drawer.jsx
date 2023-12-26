import { Link } from "react-router-dom";

function Drawer() {
  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="btn drawer-button text-xl">
            <i className="fa-solid fa-bars"></i>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <p className="btn btn-ghost normal-case text-xl custom-link">
                CodeSpaceX
              </p>
            </li>
            {/* 
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create-post">Create Forum Post</Link>
            </li>
            <li>
              <Link to="/">Events</Link>
            </li> */}

            {/* Move Login and Register buttons to the bottom */}
            <div className="mt-auto">
              {/* Add this container */}
              <div className="flex space-x-2">
                <Link to="/login" className="btn w-1/2 ">
                  Login
                </Link>
                <Link to="/signup" className="btn w-1/2">
                  Register
                </Link>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Drawer;
