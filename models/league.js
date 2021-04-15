const mongoose = require("mongoose");
const Layout = require("../models/layout");
const Event = require("../models/event");

const leagueSchema = new mongoose.Schema({
  public: { type: Boolean, default: true },
  name: { type: String, required: true, minlength: 3 },
  organizer: { type: mongoose.Types.ObjectId, ref: "User" },
  users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  regDeadline: { type: Date },
  layouts: [Layout.schema],
  createdDate: { type: Date, default: Date.now() },
  events: [Event.schema],
});

const League = mongoose.model("League", leagueSchema);

module.exports = League;
