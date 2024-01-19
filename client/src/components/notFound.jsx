import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<>
			<h3>The page you are looking sadly does not exist.</h3>
			<p>
				Route to home page:{" "}
				<Link to={"/"} className="text-blue-500">
					Home page
				</Link>
			</p>
		</>
	);
};

export default NotFound;
