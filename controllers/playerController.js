const Player = require("../models/player");
const crudController = require("../utils/crud");
const { getAllWith } = require("./roundController");

module.exports = {
  ...crudController(Player),
  getAllRounds: getAllWith("player"),
};
