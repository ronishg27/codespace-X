import { useState, useEffect } from "react";

const ForumPost = () => {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5174/api/forumFeed");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const postData = await response.json();
        // console.log(postData);
        setPostData(postData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="border w-1/2 m-auto rounded-md p-4">
        <h1 className="text-3xl font-bold mb-10">CodeSpaceX Forum Posts</h1>
        {postData &&
          postData.map((post) => (
            <div key={post._id} className="mb-8">
              <div className="bg-gray-200 p-2 border-b">
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="italic">Author: {post.author}</p>
                <p className="italic">Date: {post.date}</p>
              </div>
              <div className="p-4">{post.content}</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ForumPost;
