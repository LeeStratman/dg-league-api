const mongoose = require("mongoose");
const Hole = require("../models/hole");

const layoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  distance: { type: Number },
  source: { type: String },
  courseId: { type: String, required: true },
  holes: [Hole.schema],
  public: { type: Boolean, default: false },
});

const Layout = mongoose.model("Layout", layoutSchema);

module.exports = Layout;
