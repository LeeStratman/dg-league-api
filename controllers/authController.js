const User = require("../models/user");
const {
  CredentialsError,
  ServerError,
  ResourceExistsError,
  RequiredFieldError,
} = require("../utils/error");

const signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    const token = newUser.generateAuthToken();

    res.status(201).send({ token });
  } catch (err) {
    return next(new ServerError(err));
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new RequiredFieldError("Email and password are required."));
  }

  const user = await User.findOne({ email }).exec();

  if (!user) return next(new ResourceExistsError("User"));

  try {
    const match = await user.checkPassword(password);

    if (!match) return next(new CredentialsError());

    const token = user.generateAuthToken();

    res.status(201).send({ token });
  } catch (err) {
    return next(new ServerError(err));
  }
};

module.exports = { signup, signin };
