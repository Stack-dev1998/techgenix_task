const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: { type: String, trim: true, unique: true, required: true },
  password: String,
  role: { type: String, required: true },
  attendance: [{ type: Schema.Types.ObjectId, ref: "attendance" }],
  createdAt: { type: Date, default: Date.now },
});

var User = mongoose.model("user", userSchema);
module.exports = User;
