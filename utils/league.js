const League = require("../models/league");
const { userExists } = require("./user");

const validateUserId = async (id) => {
  return await userExists({ _id: id });
};

const validateName = async (name) => {
  const exists = await League.exists({ name });

  return !exists;
};

const getUserLeagues = async (id) => {
  return await League.find({ users: id });
};

module.exports = {
  validateUserId,
  validateName,
  getUserLeagues,
};
