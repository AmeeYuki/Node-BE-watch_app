const jwt = require("jsonwebtoken");
const Member = require("../models/member.model");

module.exports = async function auth(req, res, next) {
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
    req.member = await Member.findById(decoded.id).select("-password");

    // Tiếp tục sang middleware hoặc controller tiếp theo
    next();
  } catch (e) {
    // Bắt lỗi nếu token không hợp lệ
    res.status(400).json({ msg: "Token is not valid" });
  }
};
