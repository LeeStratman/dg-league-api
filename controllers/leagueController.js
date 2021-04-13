const League = require("../models/league");
const crudController = require("../utils/crud");
const { validateUserId } = require("../utils/league");
const { ResourceExistsError, ServerError } = require("../utils/error");

const leagueCRUD = crudController(League);

const getLeagues = async (req, res, next) => {
  let leagues;
  if (req.query.name) {
    leagues = await League.find({
      public: true,
      name: { $regex: req.query.name.trim(), $options: "i" },
    })
      .select("-users")
      .populate("organizer", "-_id -__v -password -registered");
  } else {
    leagues = leagueCRUD.getAll(req, res, next);
  }

  return res.status(200).send(leagues);
};

const addUserToLeague = async (req, res, next) => {
  const { id, userId } = req.params;

  try {
    const valid = await validateUserId(userId);

    if (!valid) return next(new ResourceExistsError("User"));

    const league = await League.findById(id);

    if (!league) return next(new ResourceExistsError("League"));

    if (league.users.includes(userId))
      return res
        .status(400)
        .send({ error: "User already belongs to a league." });

    league.users.push(userId);

    const updatedLeague = await league.save();

    return res.status(200).send(updatedLeague);
  } catch (err) {
    next(new ServerError());
  }
};

module.exports = { ...leagueCRUD, getLeagues, addUserToLeague };
