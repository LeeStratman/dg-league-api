const mongoose = require("mongoose");
const Score = require("../models/score");

const scorecardSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  createdDate: { type: Date, default: Date.now() },
  scores: [Score.schema],
  complete: { type: Boolean, default: false },
});

const Scorecard = mongoose.model("Scorecard", scorecardSchema);

module.exports = Scorecard;
