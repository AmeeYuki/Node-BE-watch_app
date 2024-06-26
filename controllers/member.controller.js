const Member = require("../models/member.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class MemberController {
  // Register a new member
  async register(req, res) {
    const { memberName, password, name, yob } = req.body;

    if (!memberName || !password || !name || !yob) {
      return res.status(400).json("All fields are required");
    }

    // Kiểm tra memberName và password không chứa khoảng trắng
    const whitespaceRegex = /\s/;
    if (whitespaceRegex.test(memberName)) {
      return res.status(400).json("memberName should not contain spaces");
    }
    if (whitespaceRegex.test(password)) {
      return res.status(400).json("Password should not contain spaces");
    }
    // Kiểm tra name không chỉ chứa duy nhất khoảng trắng
    if (/^\s+$/.test(name)) {
      return res.status(400).json("Name should not be only whitespace");
    }

    try {
      const existingMember = await Member.findOne({ memberName });
      if (existingMember) {
        return res.status(400).json("Member name already exists");
      }
      const newMember = new Member({
        memberName,
        password,
        name,
        yob,
        isAdmin: false,
      });
      await newMember.save();
      const memberToSend = {
        _id: newMember._id,
        memberName: newMember.memberName,
        name: newMember.name,
        yob: newMember.yob,
        isAdmin: newMember.isAdmin,
      };
      res.json({ message: "Member registered!", member: memberToSend });
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  }
  // Login member
  async login(req, res) {
    const { memberName, password } = req.body;
    try {
      const member = await Member.findOne({ memberName });
      if (!member) {
        return res.status(400).json("Invalid credentials");
      }
      const isMatch = await bcrypt.compare(password, member.password);
      if (!isMatch) {
        return res.status(400).json("Invalid credentials");
      }
      const payload = {
        id: member._id,
        memberName: member.memberName,
        isAdmin: member.isAdmin,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      const memberToSend = {
        _id: member._id,
        memberName: member.memberName,
        name: member.name,
        yob: member.yob,
        isAdmin: member.isAdmin,
        token,
      };
      res.json(memberToSend);
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  }
  // Get all members (for admin)
  async getMembers(req, res) {
    try {
      const members = await Member.find().select("-password");
      res.json(members);
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  }
  //Update Password
  async updatePassword(req, res) {
    const { currentPassword, newPassword } = req.body;
    const memberId = req.member._id; // Lấy memberId từ token đã xác thực

    // Kiểm tra memberName và password không chứa khoảng trắng
    const whitespaceRegex = /\s/;

    if (whitespaceRegex.test(newPassword)) {
      return res
        .status(400)
        .json({ msg: "Password should not contain spaces" });
    }
    try {
      // Tìm thành viên theo memberId
      const member = await Member.findById(memberId);
      if (!member) {
        return res.status(404).json({ msg: "Member not found" });
      }

      const isMatch = await bcrypt.compare(currentPassword, member.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect current password" });
      }

      if (currentPassword === newPassword) {
        return res
          .status(400)
          .json({ msg: "New Password is the same current password" });
      }

      // Cập nhật mật khẩu mới cho thành viên
      member.password = newPassword;
      await member.save();

      res.json({ msg: "Password updated successfully" });
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  }
  // Update Infomation
  async updateInfo(req, res) {
    const { memberName, name, yob } = req.body;
    const memberId = req.member._id; // Lấy memberId từ token đã xác thực

    console.log(req.body);
    if (!memberName || !name || !yob) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Kiểm tra memberName và name không chứa khoảng trắng
    const whitespaceRegex = /\s/;
    if (whitespaceRegex.test(memberName)) {
      return res
        .status(400)
        .json({ msg: "Member name should not contain spaces" });
    }

    if (/^\s+$/.test(name)) {
      return res.status(400).json({ msg: "Name should not contain spaces" });
    }

    try {
      // Tìm thành viên theo memberId
      const member = await Member.findById(memberId);
      if (!member) {
        return res.status(404).json({ msg: "Member not found" });
      }

      // Kiểm tra nếu memberName mới đã tồn tại và khác với memberName hiện tại
      if (memberName !== member.memberName) {
        const existingMember = await Member.findOne({ memberName });
        if (existingMember) {
          return res.status(400).json({ msg: "Member name already exists" });
        }
        member.memberName = memberName;
      }

      // Cập nhật thông tin mới cho thành viên
      member.name = name;
      member.yob = yob;
      await member.save();

      // Trả về thông tin thành viên sau khi cập nhật
      const updatedMember = {
        _id: member._id,
        memberName: member.memberName,
        name: member.name,
        yob: member.yob,
        isAdmin: member.isAdmin,
      };

      res.json({
        msg: "Member info updated successfully",
        member: updatedMember,
      });
    } catch (err) {
      res.status(400).json({ msg: "Error: " + err.message });
    }
  }
}

module.exports = new MemberController();
