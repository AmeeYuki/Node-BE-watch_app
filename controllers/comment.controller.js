const Comment = require("../models/comment.model");

class commentController {
  // Get all comments
  getComments(req, res) {
    Comment.find()
      .populate("author", "name") // Populate author field with 'name' attribute from Member model
      .then((comments) => res.json(comments))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  // Add new comment
  addComment(req, res) {
    const { rating, content, author } = req.body;
    const newComment = new Comment({ rating, content, author });

    newComment
      .save()
      .then(() => res.json("Comment added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  // Get comment by ID
  getCommentById(req, res) {
    Comment.findById(req.params.id)
      .populate("author", "name")
      .then((comment) => res.json(comment))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  // Update comment by ID
  updateComment(req, res) {
    Comment.findById(req.params.id)
      .then((comment) => {
        comment.rating = req.body.rating;
        comment.content = req.body.content;
        comment.author = req.body.author;

        comment
          .save()
          .then(() => res.json("Comment updated!"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }

  // Delete comment by ID
  deleteComment(req, res) {
    Comment.findByIdAndDelete(req.params.id)
      .then(() => res.json("Comment deleted."))
      .catch((err) => res.status(400).json("Error: " + err));
  }
}

module.exports = new commentController();
