const League = require("../models/league");
const Event = require("../models/event");

const {
  ResourceExistsError,
  ServerError,
  AuthorizationError,
  BadRequestError,
} = require("../utils/error");
const Course = require("../models/course");

const getMany = async (req, res, next) => {
  try {
    const leagues = await League.find({})
      .sort("-createdDate")
      .limit(30)
      .select("-users -__v")
      .populate("organizer", "-_id -__v -password -registered")
      .exec();

    return res.status(200).send(leagues);
  } catch (err) {
    return next(new ServerError(err));
  }
};

const createOne = async (req, res, next) => {
  try {
    const league = await League.create({
      ...req.body,
      organizer: req.user._id,
    });

    res.status(201).send(league);
  } catch (err) {
    next(new ServerError(err));
  }
};

const search = async (req, res, next) => {
  const { name } = req.query;
  const { location } = req.query;
  const query = {};

  if (name) {
    query.name = { $regex: name.trim(), $options: "i" };
  }

  if (location) {
    query.zip = { $regex: location.trim(), $options: "i" };
  }

  try {
    const leagues = await League.find(query)
      .limit(30)
      .select("-players -__v")
      .populate("organizer", "-_id -__v -password");

    res.status(200).send(leagues);
  } catch (err) {
    next(new ServerError(err));
  }
};

const getOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const league = await League.findById(id)
      .select("-__v")
      .populate("organizer", "-__v -password -registered")
      .lean()
      .exec();

    if (!league) return next(new ResourceExistsError("League"));

    return res.status(200).send(league);
  } catch (err) {
    return next(new ServerError(err));
  }
};

const updateOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    let league = await League.findById(id);

    if (!league) return next(new ResourceExistsError("League"));

    if (req.user._id !== league.organizer.toString())
      return next(new AuthorizationError());

    Object.keys(req.body).forEach((key) => {
      league[key] = req.body[key];
    });

    league = await league.save();

    res.status(200).send(league);
  } catch (err) {
    return next(new ServerError(err));
  }
};

const deleteOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    let league = await League.findById(id);

    if (!league) return next(new ResourceExistsError("League"));

    if (req.user._id !== league.organizer.toString())
      return next(new AuthorizationError());

    league = await league.remove();

    res.status(200).send(league);
  } catch (err) {
    return next(new ServerError(err));
  }
};

const joinLeague = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;

  try {
    const league = await League.findById(id);

    if (!league) return next(new ResourceExistsError("League"));

    if (league.players.includes(_id))
      return res
        .status(400)
        .send({ error: "User already belongs to a league." });

    league.players.push(_id);

    const updatedLeague = await league.save();

    return res.status(200).send(updatedLeague);
  } catch (err) {
    next(new ServerError(err));
  }
};

const getEvents = async (req, res, next) => {
  const { id } = req.params;

  try {
    const events = await Event.find({ leagueId: id }).lean().exec();

    res.status(200).send(events);
  } catch (err) {
    next(new ServerError(err));
  }
};

const getPlayers = async (req, res, next) => {
  const { id } = req.params;

  try {
    const league = await League.findById(id)
      .populate("players", "-password -active -__v")
      .lean()
      .exec();

    if (!league) return next(new ResourceExistsError("League"));

    res.status(200).send(league.players);
  } catch (err) {
    next(new ServerError(err));
  }
};

const addCourse = async (req, res, next) => {
  const { id } = req.params;
  const { course } = req.body;

  if (!course) return next(new BadRequestError());

  try {
    const newCourse = new Course(course);

    const league = await League.findByIdAndUpdate(
      id,
      { $push: { courses: newCourse } },
      { new: true }
    ).exec();

    if (!league) return next(new ResourceExistsError("League"));

    res.status(200).send(league);
  } catch (err) {
    next(new ServerError(err));
  }
};

const removeCourse = async (req, res, next) => {
  const { id } = req.params;
  const { course } = req.body;

  if (!course) return next(new BadRequestError());

  try {
    const league = await League.findByIdAndUpdate(
      id,
      { $pull: { courses: { _id: course._id } } },
      { new: true }
    ).exec();

    if (!league) return next(new ResourceExistsError("League"));

    res.status(200).send(league);
  } catch (err) {
    next(new ServerError(err));
  }
};

module.exports = {
  getMany,
  createOne,
  search,
  getOne,
  updateOne,
  deleteOne,
  joinLeague,
  getEvents,
  getPlayers,
  addCourse,
  removeCourse,
};
