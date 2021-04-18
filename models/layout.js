const mongoose = require("mongoose");

const layoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  courseId: { type: String, required: true },
  tee_pos: { type: Number, default: 1 },
});

const Layout = mongoose.model("Layout", layoutSchema);

module.exports = Layout;
