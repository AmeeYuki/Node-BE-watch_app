const Comment = require("../models/comment.model");

class CommentController {
  // Create a new comment
  async createComment(req, res) {
    const { rating, content, author } = req.body;

    try {
      const newComment = new Comment({ rating, content, author });
      await newComment.save();
      res.status(201).json(newComment);
    } catch (err) {
      res
        .status(400)
        .json({ msg: "Failed to create comment", error: err.message });
    }
  }

  // Get all comments
  async getComments(req, res) {
    try {
      const comments = await Comment.find().populate("author");
      res.status(200).json(comments);
    } catch (err) {
      res
        .status(400)
        .json({ msg: "Failed to get comments", error: err.message });
    }
  }

  // Get comment by ID
  async getCommentById(req, res) {
    const { id } = req.params;

    try {
      const comment = await Comment.findById(id).populate("author");
      if (!comment) {
        return res.status(404).json({ msg: "Comment not found" });
      }
      res.status(200).json(comment);
    } catch (err) {
      res
        .status(400)
        .json({ msg: "Failed to get comment", error: err.message });
    }
  }

  // Update a comment
  async updateComment(req, res) {
    const { id } = req.params;
    const { rating, content } = req.body;

    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        id,
        { rating, content },
        { new: true }
      ).populate("author");
      if (!updatedComment) {
        return res.status(404).json({ msg: "Comment not found" });
      }
      res.status(200).json(updatedComment);
    } catch (err) {
      res
        .status(400)
        .json({ msg: "Failed to update comment", error: err.message });
    }
  }

  // Delete a comment
  async deleteComment(req, res) {
    const { id } = req.params;

    try {
      const comment = await Comment.findById(id);
      if (!comment) {
        return res.status(404).json({ msg: "Comment not found" });
      }
      await comment.remove();
      res.status(200).json({ msg: "Comment deleted successfully" });
    } catch (err) {
      res
        .status(400)
        .json({ msg: "Failed to delete comment", error: err.message });
    }
  }
}

module.exports = new CommentController();
