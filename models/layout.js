const mongoose = require("mongoose");
const Course = require("./course");

const layoutSchema = new mongoose.Schema({
  description: { type: String },
  numHoles: { type: Number, default: 18 },
  course: { type: Course.schema, required: true },
});

const Layout = mongoose.model("Layout", layoutSchema);

module.exports = Layout;
