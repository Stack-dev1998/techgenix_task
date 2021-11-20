const mongoose = require("mongoose");

//post schema
var leavesSchema = new mongoose.Schema({
  NoOfLeaves: { type: Number, default: 1 },
  reason: { type: String, required: true },
  isApproved: { type: String, default: "pending" },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  createdAt: { type: Date, default: Date.now },
});
var leavesModel = mongoose.model("leave", leavesSchema);

module.exports = leavesModel;
