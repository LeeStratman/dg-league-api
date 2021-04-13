const { userExists } = require("./user");

const validateOrganizer = async (id) => {
  return await userExists({ _id: id });
};

const validateName = async (name) => {
  return await !userExists({ name: name });
};

module.exports = { validateOrganizer, validateName };
