const mongoose = require("mongoose");
const Hole = require("./hole");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  holes: [Hole.schema],
  city: { type: String },
  state: { type: String },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
