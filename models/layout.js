const mongoose = require("mongoose");

const layoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  courseId: { type: String, required: true },
  tee_pos: { Type: Number },
});

const Layout = mongoose.model("Layout", layoutSchema);

module.exports = Layout;
