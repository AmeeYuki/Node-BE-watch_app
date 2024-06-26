const jwt = require("jsonwebtoken");
const Member = require("../models/member.model");

module.exports = function auth(requiredRole) {
  return async function (req, res, next) {
    // Lấy token từ header "Authorization"
    const token = req.header("Authorization");

    // Kiểm tra xem token có tồn tại không
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
      // Giải mã token
      const decoded = jwt.verify(
        token.replace("Bearer ", ""),
        process.env.JWT_SECRET
      );

      // Tìm thành viên từ ID đã giải mã và loại bỏ mật khẩu
      const member = await Member.findById(decoded.id).select("-password");

      // Kiểm tra nếu thành viên không tồn tại
      if (!member) {
        return res.status(401).json({ msg: "No token, authorization denied" });
      }

      // Gán thông tin thành viên vào request để sử dụng trong các middleware và controller sau
      req.member = member;

      // Kiểm tra quyền truy cập yêu cầu
      if (requiredRole === "admin") {
        // Nếu yêu cầu là admin, kiểm tra xem thành viên có phải là admin hay không
        if (!member.isAdmin) {
          return res
            .status(403)
            .json({ msg: "Unauthorized, admin access required" });
        }
      } else {
        // Nếu không yêu cầu quyền admin, chỉ cần là thành viên đăng nhập là được
        // Check for scenarios where admin is not allowed
        // For example, if you want to prevent admins from performing certain actions
        if (member.isAdmin) {
          return res
            .status(403)
            .json({ msg: "Unauthorized, admin access not allowed" });
        }
      }

      // Tiếp tục sang middleware hoặc controller tiếp theo
      next();
    } catch (e) {
      // Bắt lỗi nếu token không hợp lệ
      res.status(400).json({ msg: "Token is not valid" });
    }
  };
};
