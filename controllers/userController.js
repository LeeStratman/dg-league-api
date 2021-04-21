const User = require("../models/user");
const League = require("../models/league");
const Event = require("../models/event");
const crudController = require("../utils/crud");
const { ResourceExistsError, ServerError } = require("../utils/error");

const getMe = async (req, res, next) => {
  const { user } = req;

  try {
    const leagues = await League.find({ players: user._id }).lean().exec();
    const organizedLeagues = await League.find({ organizer: user._id })
      .lean()
      .exec();

    const leagueIds = leagues.map((league) => league._id);

    const events = await Event.find({ leagueId: { $in: leagueIds } })
      .sort("data")
      .lean()
      .exec(0);

    res.status(200).send({ ...user, leagues, organizedLeagues, events });
  } catch (err) {
    return next(new ServerError(err));
  }
};

const removeOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    let user = await User.findById(id);

    if (!user) return next(new ResourceExistsError("User"));

    user.active = false;
    user = await user.save();

    return res.status(200).end();
  } catch (err) {
    return next(new ServerError(err));
  }
};

module.exports = {
  ...crudController(User),
  getMe,
  removeOne,
};
