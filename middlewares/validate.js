const Joi = require("joi");
const { BadRequestError } = require("../utils/error");

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

module.exports = { validateUser };
