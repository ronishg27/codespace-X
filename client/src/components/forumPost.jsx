import { useState, useEffect } from "react";
// import { Logout } from "./logout";
import { Link } from "react-router-dom";

const ForumPost = () => {
	const [postData, setPostData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(
					"http://localhost:8080/api/v1/posts/fetch-post"
				);

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const jsonData = await response.json();
				setPostData(jsonData.data);
			} catch (error) {
				console.error("Error fetching data:", error.message); // Log the specific error message
			} finally {
				setLoading(false); // Set loading to false in both success and error cases
			}
		})();
	}, []);

	if (loading) {
		return <p>Loading...</p>;
	}

	// console.log(postData);
	const options = {
		month: "short", // short month name
		day: "numeric", // Day of the month
		year: "numeric", // Four-digit year
		hour: "numeric", // Hour in 12-hour format
		minute: "numeric", // Minutes
		hour12: false, // Use 24-hour clock
	};

	const getDate = (date) => date.toLocaleString("en-US", options);

	return (
		<>
			<div className="border w-3/4 m-auto rounded-md p-4">
				<h1 className="text-3xl font-bold mb-10">
					CodeSpaceX Forum Posts
				</h1>
				{postData &&
					postData.map((post) => (
						<div key={post._id} className="mb-8 border shadow-sm">
							<div className="bg-gray-200 p-2 border-b">
								<h2 className="text-xl font-bold">
									{post.title}
								</h2>
								<div className="flex flex-wrap justify-between">
									<span className="italic">
										Author:{" "}
										<Link
											className="font-semibold"
											to={`/u/profile/${post.author.username}`}
										>
											{post.author.username}
										</Link>
									</span>
									<span className="italic">
										Date: {getDate(new Date(post.date))}
									</span>
								</div>
							</div>

							<div className="p-4">{post.content}</div>
							{/* <CommentBox comments={"post._id"} /> */}
						</div>
					))}
			</div>
		</>
	);
};

export default ForumPost;
