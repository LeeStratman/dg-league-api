const User = require("../models/user");
const crudController = require("../utils/crud");
const { ResourceExistsError, ServerError } = require("../utils/error");

const removeOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    let user = await User.findById(id);

    if (!user) return next(new ResourceExistsError("User"));

    user.active = false;
    user = await user.save();

    return res.status(200).end();
  } catch (err) {
    return next(new ServerError(err));
  }
};

module.exports = {
  ...crudController(User),
  removeOne,
};
