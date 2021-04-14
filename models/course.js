const mongoose = require("mongoose");
const Hole = require("./hole");

const courseSchema = new mongoose.Schema({
  source_id: { type: String },
  source: { type: String },
  numHoles: { type: Number },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  zip: { type: String },
  name: { type: String, required: true },
  paytoplay: { type: Boolean },
  holes: [Hole.schema],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
