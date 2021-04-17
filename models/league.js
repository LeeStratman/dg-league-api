const mongoose = require("mongoose");

const leagueSchema = new mongoose.Schema({
  public: { type: Boolean, default: true },
  name: { type: String, required: true, minlength: 3, unique: true },
  organizer: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  courses: [{ type: String }],
  regDeadline: { type: Date },
  createdDate: { type: Date, default: Date.now() },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  description: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
});

const League = mongoose.model("League", leagueSchema);

module.exports = League;
