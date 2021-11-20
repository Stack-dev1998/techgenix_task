const mongoose = require("mongoose");

//post schema
var attendanceSchema = new mongoose.Schema({
  checkIn: { type: Date, default: null },
  checkOut: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});
var attendanceModel = mongoose.model("attendance", attendanceSchema);

module.exports = attendanceModel;
