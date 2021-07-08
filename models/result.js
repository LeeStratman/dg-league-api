const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  player: { type: mongoose.Types.ObjectId, ref: "User" },
  result: { type: Number, required: true },
});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
