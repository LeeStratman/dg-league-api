const mongoose = require("mongoose");

const leagueSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, unique: true },
    description: { type: String },
    organizer: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    players: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    courses: [{ type: String }],
    city: { type: String },
    state: { type: String },
    zip: { type: String },
  },
  { timestamps: true }
);

const League = mongoose.model("League", leagueSchema);

module.exports = League;
