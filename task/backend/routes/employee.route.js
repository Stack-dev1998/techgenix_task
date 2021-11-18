const router = require("express").Router();
const employeeAuth = require("../utils/employeeAuth")
const Attendance = require("../models/attendance.model");
const User = require("../models/user.model");
const Leaves = require("../models/leaves.model");

router.post("/check-in",employeeAuth, async (req, res) => {
  try {
    const employeeId = req._id;
    const user = await User.findOne({ _id: employeeId }).populate("attendance");
    if (user.attendance && user.attendance.length > 0) {
      const lastCheckIn = user.attendance[user.attendance.length - 1];
      const lastCheckInTimeStamp = lastCheckIn.checkIn;
      const lastPresent = {
        year: new Date(lastCheckInTimeStamp).getFullYear(),
        month: new Date(lastCheckInTimeStamp).getMonth() + 1,
        day: new Date(lastCheckInTimeStamp).getDate(),
      };
      const currentTime = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
      };

      if (
        currentTime.year > lastPresent.year ||
        currentTime.month > lastPresent.month ||
        currentTime.day > lastPresent.day
      ) {
        const timeStamp = Date.now();
        const newAttendance = new Attendance({
          checkIn: timeStamp,
        });
        newAttendance.save(async (error, result) => {
          console.log(result);
          await User.findByIdAndUpdate(
            { _id: employeeId },
            { $push: { attendance: result._id } },
            { new: true, upsert: true }
          );
          if (error) return res.status(500).json({ msg: error.message });
          return res
            .status(200)
            .json({ msg: "You have been signed in for today!" });
        });
      } else {
        return res.status(400).json({ msg: "already present!" });
      }
    } else {
      const timeStamp = Date.now();
      const newAttendance = new Attendance({
        checkIn: timeStamp,
      });
      newAttendance.save(async (error, result) => {
        console.log(result);
        const saveUser = await User.findByIdAndUpdate(
          { _id: employeeId },
          { $push: { attendance: result._id } },
          { new: true, upsert: true }
        );
        console.log(saveUser);
        if (error) return res.status(500).json({ msg: error.message });
        return res.status(200).json({ msg: "Checkin done  successfully!" });
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/check-out", employeeAuth,async (req, res) => {
  try {
    const employeeId = req._id;
    const user = await User.findOne({ _id: employeeId }).populate("attendance");
    if (user.attendance.length > 0) {
      const lastCheckIn = user.attendance[user.attendance.length - 1];
      await Attendance.findByIdAndUpdate(
        { _id: lastCheckIn._id },
        { checkOut: Date.now() }
      );
      return res
        .status(200)
        .json({ msg: "You have been signed out for today!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/request-for-leave",employeeAuth, async (req, res) => {
  try {
    const employeeId = req._id
    const reason = req.body.reason;
    const NoOfLeaves = req.body.NoOfLeaves;
    const newLeave = new Leaves({
      employeeId,
      reason,
      NoOfLeaves,
    });
    await newLeave.save();
    res.status(200).json({ msg: "Request sent successfully!" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

router.get("/get-all-leave-requests",employeeAuth, async (req, res) => {
  console.log(req._id)
  try {
    const employeeId = req._id;
    const result = await Leaves.find({ employeeId });
    res.status(200).json({ leaves: result });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
