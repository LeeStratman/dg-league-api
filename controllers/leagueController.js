const League = require("../models/league");
const Event = require("../models/event");
const Scorecard = require("../models/scorecard");
const Score = require("../models/score");
const Result = require("../models/result");
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
    next(new ServerError(err));
  }
};

const updateLayout = async (req, res, next) => {
  const { id, layoutId } = req.params;

  try {
    let league = await League.findById(id);

    if (!league) return next(new ResourceExistsError("League"));

    const layout = league.layouts.id(layoutId);

    Object.keys(req.body).forEach((key) => {
      layout[key] = req.body[key];
    });

    league = await league.save();

    return res.status(200).send(league);
  } catch (err) {
    next(new ServerError(err));
  }
};

const createEvent = async (req, res, next) => {
  const { id } = req.params;

  try {
    let league = await League.findById(id);

    if (!league) return next(new ResourceExistsError("League"));

    const event = new Event({ ...req.body });

    league.events.push(event);

    league = await league.save();

    res.status(200).send(league);
  } catch (err) {
    next(new ServerError(err));
  }
};

const createScorecard = async (req, res, next) => {
  const { id, eventId } = req.params;

  try {
    let league = await League.findById(id);

    if (!league) return next(new ResourceExistsError("League"));

    const event = league.events.id(eventId);

    if (!event) return next(new ResourceExistsError("Event"));

    const scorecard = new Scorecard({ ...req.body });

    event.scorecards.push(scorecard);

    league = await league.save();

    res.status(200).send(league);
  } catch (err) {
    next(new ServerError(err));
  }
};

const addScore = async (req, res, next) => {
  const { id, eventId, scorecardId } = req.params;

  try {
    let league = await League.findById(id);

    if (!league) return next(new ResourceExistsError("League"));

    const event = league.events.id(eventId);

    if (!event) return next(new ResourceExistsError("Event"));

    const scorecard = event.scorecards.id(scorecardId);

    if (!scorecard) return next(new ResourceExistsError("Scorecard"));

    const score = new Score({ ...req.body });

    scorecard.scores.push(score);

    league = await league.save();

    res.status(200).send(league);
  } catch (err) {
    next(new ServerError(err));
  }
};

const updateScore = async (req, res, next) => {
  const { id, eventId, scorecardId, scoreId } = req.params;

  try {
    let league = await League.findById(id);

    if (!league) return next(new ResourceExistsError("League"));

    const event = league.events.id(eventId);

    if (!event) return next(new ResourceExistsError("Event"));

    const scorecard = event.scorecards.id(scorecardId);

    if (!scorecard) return next(new ResourceExistsError("Scorecard"));

    const score = scorecard.scores.id(scoreId);

    if (!score) return next(new ResourceExistsError("Score"));

    Object.keys(req.body).forEach((key) => {
      score[key] = req.body[key];
    });

    league = await league.save();

    res.status(200).send(league);
  } catch (err) {
    next(new ServerError(err));
  }
};

const deleteScore = async (req, res, next) => {
  const { id, eventId, scorecardId, scoreId } = req.params;

  try {
    let league = await League.findById(id);

    if (!league) return next(new ResourceExistsError("League"));

    const event = league.events.id(eventId);

    if (!event) return next(new ResourceExistsError("Event"));

    const scorecard = event.scorecards.id(scorecardId);

    if (!scorecard) return next(new ResourceExistsError("Scorecard"));

    const score = scorecard.scores.id(scoreId);

    if (!score) return next(new ResourceExistsError("Score"));

    score.remove();

    league = await league.save();

    res.status(200).send(league);
  } catch (err) {
    next(new ServerError(err));
  }
};

const getEvent = async (req, res, next) => {
  const { id, eventId } = req.params;

  try {
    const league = await League.findById(id);

    if (!league) return next(new ResourceExistsError("League"));

    const event = league.events.id(eventId);

    if (!event) return next(new ResourceExistsError("Event"));

    res.status(200).send(event);
  } catch (err) {
    next(new ServerError(err));
  }
};

const calculateResults = async (req, res, next) => {
  const { id, eventId } = req.params;

  try {
    let league = await League.findById(id);

    if (!league) return next(new ResourceExistsError("League"));

    const event = league.events.id(eventId);

    if (!event) return next(new ResourceExistsError("Event"));

    const results = event.scorecards
      .map((scorecard) => scorecard.scores)
      .flat()
      .map((score) => {
        return new Result({
          player: score.player,
          result: score.holes.reduce((acc, hole) => acc + hole),
        });
      });

    event.results = results;

    event.calculatedDate = Date.now();

    league = await league.save();

    res.status(200).send(league);
  } catch (err) {
    next(new ServerError(err));
  }
};

module.exports = {
  ...leagueCRUD,
  getLeagues,
  addUserToLeague,
  updateLayout,
  createEvent,
  createScorecard,
  addScore,
  updateScore,
  deleteScore,
  calculateResults,
  getEvent,
};
