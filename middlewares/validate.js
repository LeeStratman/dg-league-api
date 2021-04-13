const Joi = require("joi");
const {
  BadRequestError,
  UserExistsError,
  UniquePropertyError,
} = require("../utils/error");
const { validateOrganizer, validateName } = require("../utils/league");

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    email: Joi.string().email(),
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
  });
  const { error } = schema.validate(req.body);

  if (error) next(new BadRequestError());

  next();
};

const validateLeague = (req, res, next) => {
  const schema = Joi.object({
    public: Joi.boolean(),
    name: Joi.string().min(3).required(),
    organizer: Joi.string().min(24).required(),
  });
  const { error } = schema.validate(req.body);

  if (error) next(new BadRequestError());

  next();
};

const validateLeagueOrganizer = async (req, res, next) => {
  const { organizer } = req.body;

  if (!organizer) next(new BadRequestError());

  const valid = await validateOrganizer(organizer);

  if (!valid) next(new UserExistsError());

  next();
};

const validateLeagueName = async (req, res, next) => {
  const { name } = req.body;

  if (!name) next(new BadRequestError());

  const valid = await validateName(name);

  if (!valid) next(new UniquePropertyError());

  next();
};

module.exports = {
  validateUser,
  validateLeague,
  validateLeagueOrganizer,
  validateLeagueName,
};
