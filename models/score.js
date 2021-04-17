const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  player: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  holes: [{ type: Number, required: true }],
});

// Virtualize total!

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
