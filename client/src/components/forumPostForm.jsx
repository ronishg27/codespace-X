import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
const ForumPostForm = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    content: "",
    author: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const onPost = async (postData) => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:8080/api/v1/post/create-post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Form data uploaded successfully:", result);
        // You can handle the success response as needed
      } else {
        console.error("Failed to upload form data");
        // Handle the error response
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
      // Handle any network or unexpected errors
    } finally {
      setLoading(false);
    }
  };

  const formRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const dateOptions = { month: "short", day: "numeric", year: "numeric" };
    onPost({
      ...post,
      date: currentDate.toLocaleDateString("en-US", dateOptions),
    });
    setPost({
      title: "",
      content: "",
      author: "",
      date: "",
    });
    navigate("/");
  };

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white py-5 px-10 rounded-md shadow-md max-w-screen-sm  mx-auto mt-4"
      >
        <div className="mb-4 m-auto">
          <h1 className="text-3xl font-bold mb-10">Create your post</h1>
          <label
            htmlFor="title"
            className="block text-xl font-medium text-gray-600"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="w-10/12 px-3 py-2 border-2 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-xl font-medium text-gray-600"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            className="w-10/12 px-3 py-2 border-2 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="author"
            className="block text-xl font-medium text-gray-600"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={post.author}
            onChange={handleChange}
            className="w-10/12 px-3 py-2 border-2 rounded-md "
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </>
  );
};

export default ForumPostForm;
