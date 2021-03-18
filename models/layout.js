const mongoose = require("mongoose");

const layoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  distance: { type: String },
});

const Layout = mongoose.model("Layout", layoutSchema);

module.exports = Layout;
