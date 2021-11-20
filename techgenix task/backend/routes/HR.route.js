const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Leaves = require("../models/leaves.model");
const HRAuth  = require("../utils/HRAuth")
router.post("/signup", (req, res) => {
  const username = req.body.username;
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  console.log(req.body);
  var newUser = new User({
    username,
    email,
    password: bcrypt.hashSync(password, 8),
    role: "HR",
  });
  newUser.save((err, result) => {
    if (err) return res.status(500).json({ msg: err.message });
    res.json({ msg: "signup successfully" });
  });
});

router.post("/add-employee",HRAuth, (req, res) => {
  const username = req.body.username;
  const email = req.body.email.toLowerCase();
  const password = req.body.password.toString();
  const role = "Employee";
  console.log(req.body);
  var newUser = new User({
    username,
    email,
    password: bcrypt.hashSync(password, 8),
    role,
  });
  newUser.save((err, result) => {
    if (err) return res.status(500).json({ msg: err.message });
    res.status(200).json({ msg: "Added employee successfully!" });
  });
});

//get all employees
router.get("/all-employees",HRAuth, async (req, res) => {
  try {
    const result = await User.find({ role: "Employee" }).select(
      "username email createdAt"
    );
    return res.status(200).json({ employees: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
});

//update user route
router.put("/update-employee", HRAuth,async (req, res) => {
  const employeeId = req.body.employeeId;
  const email = req.body.email.toLowerCase();
  const username = req.body.username;
  try {
    await User.findOneAndUpdate({ _id: employeeId }, { username, email });
    return res.status(200).json({ msg: "Updated user successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
});

//delete employee
router.delete("/delete-employee/:id",HRAuth, async (req, res) => {
  const id = req.params.id;
  try {
    await User.deleteOne({ _id: id });
    return res.status(200).json({ msg: "Deleted user successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
}); 

router.get("/leave-requests",HRAuth, async (req, res) => {
  try {
    const result = await Leaves.find({ isApproved: "pending" });
    res.status(200).json({ leaves: result });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

//approve leave request
router.post("/approve-leave",HRAuth, async (req, res) => {
  const leaveId = req.body.leaveId;
  try {
    await Leaves.findOneAndUpdate({ _id: leaveId }, { isApproved: "approved" });
    return res.status(200).json({ msg: "Leave approved successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
});

//Reject leave request
router.post("/reject-leave",HRAuth, async (req, res) => {
  const leaveId = req.body.leaveId;
  try {
    await Leaves.findOneAndUpdate({ _id: leaveId }, { isApproved: "rejected" });
    return res.status(200).json({ msg: "Leave rejected successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
});

router.get("/get-employees-checkin-checkout",HRAuth, async (req, res) => {
  try {
    const result = await User.find({role:"Employee"})
      .select("username")
      .populate("attendance");
    res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});



module.exports = router;
