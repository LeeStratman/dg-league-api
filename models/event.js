const mongoose = require("mongoose");
const Scorecard = require("../models/scorecard");
const Result = require("../models/result");

const eventSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  layout: { type: mongoose.Types.ObjectId, ref: "Layout" },
  published: { type: Boolean, default: false },
  status: { type: String }, // pending, complete, cancelled
  scorecards: [Scorecard.schema], // Raw scores submitted by players.
  results: [Result.schema], // Calculated total scores. (when status === 'complete')
  calculatedDate: { type: Date }, // last time scores were calculated.
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
