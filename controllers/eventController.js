const Event = require("../models/event");
const League = require("../models/league");
const Error = require("../utils/error");
const Scorecard = require("../models/scorecard");
const Layout = require("../models/layout");

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

const getOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id).lean().exec();

    if (!event) return next(new Error.ResourceExistsError("Event"));

    res.status(200).send(event);
  } catch (err) {
    next(new Error.ServerError(err));
  }
};

const updateOne = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;

  try {
    let event = await Event.findById(id).populate("leagueId").exec();

    if (!event) return next(new Error.ResourceExistsError("Event"));

    if (event.leagueId.organizer.toString() !== _id)
      return next(new Error.AuthorizationError());

    if (req.body.layout) {
      const layout = new Layout(req.body.layout);
      req.body.layout = layout;
    }

    Object.keys(req.body).forEach((key) => {
      event[key] = req.body[key];
    });

    event = await event.save();

    res.status(200).send(event);
  } catch (err) {
    next(new Error.ServerError(err));
  }
};

const deleteOne = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;

  try {
    let event = await Event.findById(id).populate("leagueId").exec();

    if (!event) return next(new Error.ResourceExistsError("Event"));

    if (event.leagueId.organizer.toString() !== _id)
      return next(new Error.AuthorizationError());

    event = await event.remove();

    res.status(200).send(event._id);
  } catch (err) {
    next(new Error.ServerError(err));
  }
};

const createScorecard = async (req, res, next) => {
  const { id } = req.params;

  try {
    const scorecard = new Scorecard({ ...req.body });

    const event = await Event.findOneAndUpdate(
      { _id: id },
      { $push: { scorecards: scorecard } },
      { new: true }
    ).exec();

    if (!event) {
      return next(new Error.ResourceExistsError("Event"));
    }

    res.status(201).send(event);
  } catch (err) {
    return next(new Error.ServerError(err));
  }
};

const getScorecard = async (req, res, next) => {
  const { id, scorecardId } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return next(new Error.ResourceExistsError("Event"));
    }

    const scorecard = event.scorecards.id(scorecardId);

    if (!scorecard) return next(new Error.ResourceExistsError("Scorecard"));

    return res.status(200).send(scorecard);
  } catch (err) {
    return next(new Error.ServerError(err));
  }
};

const updateScorecard = async (req, res, next) => {
  const { id, scorecardId } = req.params;

  try {
    let event = await Event.findById(id);

    if (!event) {
      return next(new Error.ResourceExistsError("Event"));
    }

    const scorecard = event.scorecards.id(scorecardId);

    if (!scorecard) return next(new Error.ResourceExistsError("Scorecard"));

    Object.keys(req.body).forEach((key) => {
      scorecard[key] = req.body[key];
    });

    event = await event.save();

    return res.status(200).send(event);
  } catch (err) {
    return next(new Error.ServerError(err));
  }
};

const deleteScorecard = async (req, res, next) => {
  const { id, scorecardId } = req.params;

  try {
    const event = await Event.findOneAndUpdate(
      { _id: id },
      { $pull: { scorecards: { _id: scorecardId } } },
      { new: true }
    ).exec();

    res.status(200).send(event);
  } catch (err) {
    return next(new Error.ServerError(err));
  }
};

module.exports = {
  createOne,
  getOne,
  updateOne,
  deleteOne,
  createScorecard,
  getScorecard,
  updateScorecard,
  deleteScorecard,
};
