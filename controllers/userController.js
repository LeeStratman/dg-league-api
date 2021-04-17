const User = require("../models/user");
const { getUserLeagues, getLeagueWithUsers } = require("../utils/league");
const crudController = require("../utils/crud");
const { ResourceExistsError, ServerError } = require("../utils/error");
const { userExists } = require("../utils/user");

const getLeagues = async (req, res, next) => {
  const { id } = req.params;

  try {
    const leagues = await getUserLeagues(id);

    return res.status(200).send(leagues);
  } catch (err) {
    next(new ServerError(err));
  }
};

const getLeague = async (req, res, next) => {
  const { id, leagueId } = req.params;

  try {
    const validUser = await userExists(id);

    if (!validUser) return next(new ResourceExistsError("User"));

    const league = await getLeagueWithUsers(leagueId);

    if (!league) return next(new ResourceExistsError("League"));

    return res.status(200).send(league);
  } catch (err) {
    next(new ServerError(err));
  }
};

module.exports = {
  ...crudController(User),
  getLeagues,
  getLeague,
};
