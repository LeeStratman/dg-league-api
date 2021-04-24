const Event = require("../models/event");

const getUpcomingLeagueEvents = (leagueIds) => {
  return Event.find({
    leagueId: { $in: leagueIds },
    date: { $gte: Date.now() },
  })
    .sort("date")
    .lean()
    .exec();
};

module.exports = {
  getUpcomingLeagueEvents,
};
