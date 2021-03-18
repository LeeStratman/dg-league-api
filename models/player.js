const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
