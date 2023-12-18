import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    mainPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    commentedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    content: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
