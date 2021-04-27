const Event = require("../models/event");

const getUpcomingLeagueEvents = (leagueIds) => {
  return Event.find({
    leagueId: { $in: leagueIds },
    date: { $gt: Date.now() },
  })
    .populate("leagueId", "_id name")
    .sort("date")
    .lean()
    .exec();
};

const getTodaysLeagueEvents = (leagueIds) => {
  return Event.find({
    leagueId: { $in: leagueIds },
    date: {
      $gte: new Date().setHours(0, 0, 0, 0),
      $lt: new Date().setHours(23, 59, 59, 999),
    },
  })
    .populate("leagueId", "_id name")
    .sort("date")
    .lean()
    .exec();
};

const getRecentLeagueEvents = (leagueIds) => {
  return Event.find({
    leagueId: { $in: leagueIds },
    date: { $lt: new Date().setHours(0, 0, 0, 0) },
  })
    .populate("leagueId", "_id name")
    .sort("-date")
    .lean()
    .exec();
};

module.exports = {
  getUpcomingLeagueEvents,
  getTodaysLeagueEvents,
  getRecentLeagueEvents,
};
