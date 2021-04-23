const mongoose = require("mongoose");
const Layout = require("../models/layout");
const Scorecard = require("../models/scorecard");
const Result = require("../models/result");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  leagueId: { type: mongoose.Types.ObjectId, required: true, ref: "League" },
  layout: { type: Layout.schema },
  results: [Result.schema],
  scorecards: [Scorecard.schema],
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
