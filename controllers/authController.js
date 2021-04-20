const User = require("../models/user");
const {
  CredentialsError,
  ServerError,
  UserExistsError,
} = require("../utils/error");

const authorize = async (req, res) => {
  return res.status(200).end();
};

const signup = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email });

    if (user) return next(new UserExistsError());

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
    return next(new CredentialsError());
  }

  const user = await User.findOne({ email }).exec();

  if (!user) return next(new CredentialsError());

  try {
    const match = await user.checkPassword(password);

    if (!match) return next(new CredentialsError());

    const token = user.generateAuthToken();

    res.status(200).send({ token });
  } catch (err) {
    return next(new ServerError(err));
  }
};

module.exports = { authorize, signup, signin };
