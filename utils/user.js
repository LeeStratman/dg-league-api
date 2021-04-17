const User = require("../models/user");

const userExists = async (_id) => {
  return await User.exists({ _id });
};

module.exports = { userExists };
