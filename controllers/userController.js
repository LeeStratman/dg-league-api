const User = require("../models/user");
const crudController = require("../utils/crud");
const { getAllWith } = require("./roundController");

module.exports = {
  ...crudController(User),
  getAllRounds: getAllWith("user"),
};
