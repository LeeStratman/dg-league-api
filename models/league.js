const mongoose = require("mongoose");

const leagueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organizer: { type: mongoose.Types.ObjectId },
  users: [{ type: mongoose.Types.ObjectId }],
});

const League = mongoose.model("League", leagueSchema);

module.exports = League;
