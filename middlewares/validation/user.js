const Joi = require("joi");
const User = require("../../models/user");
const {
  BadRequestError,
  ServerError,
  UserExistsError,
  AuthorizationError,
} = require("../../utils/error");

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

const userEmailExists = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) return next(new UserExistsError("User"));

    next();
  } catch (err) {
    return next(new ServerError(err));
  }
};

const userIdMatchesToken = (req, res, next) => {
  const { id } = req.params;

  if (!id) return next(new BadRequestError());

  if (!req.user || !req.user._id) return next(new AuthorizationError());

  if (id !== req.user._id) return next(new AuthorizationError());

  return next();
};

module.exports = {
  validateUser,
  userEmailExists,
  userIdMatchesToken,
};
