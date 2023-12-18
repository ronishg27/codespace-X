import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPost = asyncHandler(async (req, res) => {
  const { title, content, user } = req.body;

  const savedPost = await Post.create({
    author: user._id,
    title,
    content,
  });

  if (!savedPost) {
    throw new ApiError(500, "something went wrong while saving the post");
  }
  console.log(savedPost);
  return res
    .status(201)
    .json(new ApiResponse(200, savedPost, "Post saved successfully"));
});

const fetchPost = asyncHandler(async (req, res) => {
  // ? for getting limited post
  //     const postsPerPage = 10;
  // const currentPage = 1; // Change this value based on the current page
  // const skip = (currentPage - 1) * postsPerPage;
  // const posts = await Post.find().skip(skip).limit(postsPerPage);
  const posts = await Post.find();
  if (!posts) {
    throw new ApiError(500, "Error fetching the posts");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, posts, "post fetched successfully"));
});
export { createPost, fetchPost };
