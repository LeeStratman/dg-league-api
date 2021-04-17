const Event = require("../models/event");
const League = require("../models/league");
const Error = require("../utils/error");

const createOne = async (req, res, next) => {
  const { leagueId } = req.body;
  const { _id } = req.user;

  try {
    const league = await League.findById(leagueId);

    if (!league) return next(new Error.ResourceExistsError("League"));

    if (league.organizer.toString() !== _id)
      return next(new Error.AuthorizationError());

    const event = await Event.create(req.body);

    res.status(201).send(event);
  } catch (err) {
    next(new Error.ServerError(err));
  }
};

module.exports = {
  createOne,
};
