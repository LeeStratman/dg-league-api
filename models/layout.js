const mongoose = require("mongoose");
const Hole = require("../models/hole");

const layoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  distance: { type: Number },
  source: { type: String },
  courseId: { type: String, required: true },
  holes: [Hole.schema],
});

const Layout = mongoose.model("Layout", layoutSchema);

module.exports = Layout;
