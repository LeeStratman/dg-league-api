const User = require("../models/user");
const { getUserLeagues } = require("../utils/league");
const crudController = require("../utils/crud");

const getLeagues = async (req, res) => {
  const { id } = req.params;

  const leagues = await getUserLeagues(id);

  return res.status(200).send(leagues);
};

module.exports = {
  ...crudController(User),
  getLeagues,
};
