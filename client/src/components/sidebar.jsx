import { Link } from "react-router-dom";
import { Logout } from "./logout";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ children }) => {
	return (
		<>
			<div className="drawer lg:drawer-open ">
				<input
					id="my-drawer-2"
					type="checkbox"
					className="drawer-toggle"
				/>
				<div className="drawer-content flex flex-col items-center justify-center">
					{/* Page content here */}
					{children}
				</div>
				<div className="min-h-full">
					<ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content ">
						{/* Sidebar content here */}
						<li>
							<Link
								to={`/u/profile/:user-profile`}
								className="btn "
							>
								Profile
							</Link>
						</li>
						<li>
							<Link to="/u" className="btn">
								Feed
							</Link>
						</li>

						<li>
							<Link to="/u/create-post" className="btn">
								Create post
							</Link>
						</li>
						<li className="w-1/2 mx-auto">
							<Logout />
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
