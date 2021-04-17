const mongoose = require("mongoose");
const Scorecard = require("../models/scorecard");
const Result = require("../models/result");

const eventSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  layout: { type: mongoose.Types.ObjectId, required: true, ref: "Layout" },
  published: { type: Boolean, default: false },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "complete", "cancelled"],
  },
  results: [Result.schema],
  calculatedDate: { type: Date },
  leagueId: { type: mongoose.Types.ObjectId, required: true, ref: "League" },
  scorecards: [Scorecard.schema], // Denormalize on purpose, so user can't modify scorecard.  They can delete from scorecard collection, but it remains here.
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
