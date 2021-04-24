const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  sourceId: { type: String, required: true },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
