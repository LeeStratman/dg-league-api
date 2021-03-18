const mongoose = require("mongoose");
const Layout = require("./layout");

const holeSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  layouts: [Layout.schema],
});

const Hole = mongoose.model("Hole", holeSchema);

module.exports = Hole;
