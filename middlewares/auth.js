const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/user");
const Error = require("../utils/error");

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.authsecret, (err, payload) => {
      if (err) return reject(err);

      resolve(payload);
    });
  });

const protect = async (req, res, next) => {
  if (!req.headers.authorization) return next(new Error.AuthorizationError());

  const token = req.headers.authorization.split("Bearer ")[1];

  if (!token) {
    return next(new Error.AuthorizationError());
  }

  try {
    const payload = await verifyToken(token);

    const user = await User.findById(payload.id)
      .select("-password")
      .lean()
      .exec();

    if (!user || !user.active) return next(new Error.AuthorizationError());

    user._id = user._id.toString();

    req.user = user;
    next();
  } catch (err) {
    next(new Error.ServerError(err));
  }
};

module.exports = { protect };
