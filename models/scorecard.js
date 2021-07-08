const mongoose = require("mongoose");
const Score = require("../models/score");

const scorecardSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  scores: [Score.schema],
  players: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "complete", "incomplete"],
  },
});

const Scorecard = mongoose.model("Scorecard", scorecardSchema);

module.exports = Scorecard;
