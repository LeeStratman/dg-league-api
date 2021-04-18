const Event = require("../models/event");
const League = require("../models/league");
const Error = require("../utils/error");
const { getCourse } = require("../utils/api/dgcoursereview/courses");

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

    if (event.layout.courseId) {
      const { data } = await getCourse(event.layout.courseId);
      event.layout.course = data;
    }

    res.status(200).send(event);
  } catch (err) {
    next(new Error.ServerError(err));
  }
};

module.exports = {
  createOne,
  getOne,
};
