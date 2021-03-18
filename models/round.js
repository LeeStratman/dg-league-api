const mongoose = require("mongoose");

const roundSchema = new mongoose.Schema({
  player: { type: mongoose.Types.ObjectId },
  scorecard: { type: mongoose.Types.ObjectId },
  course: { type: mongoose.Types.ObjectId },
  scores: [{ type: Number }],
  date: { type: Date, default: Date.now() },
});

const Round = mongoose.model("Round", roundSchema);

module.exports = Round;
