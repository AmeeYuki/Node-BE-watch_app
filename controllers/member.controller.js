const Member = require("../models/member.model");

class memberController {
  // Get all members
  getMembers(req, res) {
    Member.find()
      .then((members) => res.json(members))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  // Add new member
  addMember(req, res) {
    const { memberName, password, name, yob, isAdmin } = req.body;
    const newMember = new Member({ memberName, password, name, yob, isAdmin });

    newMember
      .save()
      .then(() => res.json("Member added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  // Get member by ID
  getMemberById(req, res) {
    Member.findById(req.params.id)
      .then((member) => res.json(member))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  // Update member by ID
  updateMember(req, res) {
    Member.findById(req.params.id)
      .then((member) => {
        member.memberName = req.body.memberName;
        member.password = req.body.password;
        member.name = req.body.name;
        member.yob = req.body.yob;
        member.isAdmin = req.body.isAdmin;

        member
          .save()
          .then(() => res.json("Member updated!"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }

  // Delete member by ID
  deleteMember(req, res) {
    Member.findByIdAndDelete(req.params.id)
      .then(() => res.json("Member deleted."))
      .catch((err) => res.status(400).json("Error: " + err));
  }
}

module.exports = new memberController();
