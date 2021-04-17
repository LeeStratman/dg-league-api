const League = require("../models/league");
const { userExists } = require("./user");

const validateUserId = async (id) => {
  return await userExists(id);
};

const validateName = async (name) => {
  const exists = await League.exists({ name });

  return !exists;
};

const getUserLeagues = async (id) => {
  return await League.find({ users: id });
};

const getLeagueWithUsers = async (id) => {
  return await League.find({ _id: id }).populate("users", "-password");
};

module.exports = {
  validateUserId,
  validateName,
  getUserLeagues,
  getLeagueWithUsers,
};
