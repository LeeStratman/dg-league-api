const League = require("../models/league");
const crudController = require("../utils/crud");

const leagueCRUD = crudController(League);

const getLeagues = async (req, res, next) => {
  let leagues;
  if (req.query.name) {
    leagues = await League.find({
      public: true,
      name: { $regex: req.query.name.trim(), $options: "i" },
    });
  } else {
    leagues = leagueCRUD.getAll(req, res, next);
  }

  return res.status(200).send(leagues);
};

module.exports = { ...leagueCRUD, getLeagues };
