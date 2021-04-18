const User = require("../models/user");
const crudController = require("../utils/crud");
const { ResourceExistsError, ServerError } = require("../utils/error");

// const getLeagues = async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     // const leagues = await getUserLeagues(id);

//     return res.status(200).send();
//   } catch (err) {
//     next(new ServerError(err));
//   }
// };

// const getLeague = async (req, res, next) => {
//   const { id, leagueId } = req.params;

//   try {
//     const validUser = await userExists(id);

//     if (!validUser) return next(new ResourceExistsError("User"));

//     // const league = await getLeagueWithUsers(leagueId);

//     // if (!league) return next(new ResourceExistsError("League"));

//     // return res.status(200).send(league);
//   } catch (err) {
//     next(new ServerError(err));
//   }
// };

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
