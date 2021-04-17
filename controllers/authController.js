const User = require("../models/user");
const { ServerError } = require("../utils/error");

const signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    const token = newUser.generateAuthToken();

    res.status(201).send({ token });
  } catch (err) {
    return next(new ServerError(err));
  }
};

module.exports = { signup };
