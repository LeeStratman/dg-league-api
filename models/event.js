const mongoose = require("mongoose");
const Layout = require("../models/layout");
const Scorecard = require("../models/scorecard");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  leagueId: { type: mongoose.Types.ObjectId, required: true, ref: "League" },
  layout: { type: Layout.schema },
  results: [{ type: Object }],
  scorecards: [Scorecard.schema],
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
