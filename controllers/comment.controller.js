const Comment = require("../models/comment.model");

class CommentController {
  // Create a new comment
  async updateComment(req, res) {
    const { id } = req.params; // Id của comment cần cập nhật
    const { rating, content } = req.body;

    try {
      // Tìm comment theo id
      const comment = await Comment.findById(id);
      if (!comment) {
        return res.status(404).json({ msg: "Comment not found" });
      }

      // Kiểm tra xem người dùng hiện tại có quyền chỉnh sửa comment này hay không
      if (comment.author.toString() !== req.member._id.toString()) {
        return res
          .status(403)
          .json({ msg: "Unauthorized, you cannot edit this comment" });
      }

      // Cập nhật thông tin comment
      comment.rating = rating;
      comment.content = content;
      await comment.save();

      // Trả về phản hồi thành công và thông tin comment đã cập nhật
      res.status(200).json(comment);
    } catch (err) {
      res
        .status(400)
        .json({ msg: "Failed to update comment", error: err.message });
    }
  }
}

module.exports = new CommentController();
