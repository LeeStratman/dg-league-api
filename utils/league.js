const League = require("../models/league");
const { userExists } = require("./user");

const validateOrganizer = async (id) => {
  return await userExists({ _id: id });
};

const validateName = async (name) => {
  const exists = await League.exists({ name });

  return !exists;
};

module.exports = { validateOrganizer, validateName };
