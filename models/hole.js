const mongoose = require("mongoose");

const holeSchema = new mongoose.Schema({
  course_number: { type: Number, required: true },
  layout_number: { type: Number, required: true },
  distance: { type: Number, required: true },
  par: { type: Number, required: true },
  notes: { type: String },
});

const Hole = mongoose.model("Hole", holeSchema);

module.exports = Hole;
