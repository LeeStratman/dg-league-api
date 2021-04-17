const Joi = require("joi");
const League = require("../../models/league");
const { BadRequestError, UniquePropertyError } = require("../../utils/error");

const validateLeague = (req, res, next) => {
  const schema = Joi.object({
    public: Joi.boolean(),
    name: Joi.string().min(3).required(),
    organizer: Joi.string().min(24).required(),
    city: Joi.string().min(2),
    state: Joi.string().max(2).min(2),
    description: Joi.string().min(3),
  });
  const { error } = schema.validate(req.body);

  if (error) next(new BadRequestError());

  next();
};

const validateLeagueOrganizer = async (req, res, next) => {
  const { organizer } = req.body;

  if (!organizer) next(new BadRequestError());

  next();
};

const validateLeagueName = async (req, res, next) => {
  const { name } = req.body;

  if (!name) next(new BadRequestError());

  const league = await League.findOne({ name }).exec();

  if (league) next(new UniquePropertyError());

  next();
};

module.exports = {
  validateLeague,
  validateLeagueOrganizer,
  validateLeagueName,
};
