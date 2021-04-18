const Joi = require("joi");
const { BadRequestError } = require("../../utils/error");

const validateScorecard = (req, res, next) => {
  const schema = Joi.object({
    date: Joi.date().default(Date.now),
    players: Joi.array().items(Joi.string().min(24)).required(),
    status: Joi.string()
      .default("pending")
      .valid("pending", "complete", "incomplete"),
  });
  const { error } = schema.validate(req.body);

  if (error) next(new BadRequestError());

  next();
};

module.exports = {
  validateScorecard,
};
