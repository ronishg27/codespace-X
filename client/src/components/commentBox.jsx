import { useState } from "react";

const [comment, setComment] = useState();

const onComment = async (commentData) => {
  try {
    const response = await fetch("http://localhost:5174/api/uploadFormData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("commented  successfully:", result);
      // You can handle the success response as needed
    } else {
      console.error("Failed to comment");
      // Handle the error response
    }
  } catch (error) {
    console.error("Error submitting form:", error.message);
    // Handle any network or unexpected errors
  } finally {
    //   setLoading(false);
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  
};

export const CommentBox = ({ postId }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="commentBox"
          id="commentBox"
          placeholder="Add a comment
        "
        />
        <label htmlFor="commentBox"></label>
      </form>
    </div>
  );
};
