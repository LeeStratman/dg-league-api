const {
  getCourseInfo,
  searchCourses,
} = require("../utils/api/dgcoursereview/courses");

const getAll = async (req, res, next) => {
  searchCourses(req, res, next);
};

const getOne = async (req, res, next) => {
  getCourseInfo(req, res, next);
};
module.exports = { getAll, getOne };
