const User = require("../models/user");

const userExists = async (filter) => {
  return await User.exists(filter);
};

module.exports = { userExists };
