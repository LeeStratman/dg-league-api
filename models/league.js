const mongoose = require("mongoose");

const leagueSchema = new mongoose.Schema({
  public: { type: Boolean, default: true },
  name: { type: String, required: true, minlength: 3 },
  organizer: { type: mongoose.Types.ObjectId, ref: "User" },
  users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  regDeadline: { type: Date },
  layouts: [{ type: mongoose.Types.ObjectId, ref: "Layout" }],
  createdDate: { type: Date, default: Date.now() },
});

const League = mongoose.model("League", leagueSchema);

module.exports = League;
