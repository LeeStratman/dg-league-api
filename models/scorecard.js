const mongoose = require("mongoose");

const scorecardSchema = new mongoose.Schema({
  type: { type: String },
  league: { type: mongoose.Types.ObjectId },
});

const Scorecard = mongoose.model("Scorecard", scorecardSchema);

module.exports = Scorecard;
