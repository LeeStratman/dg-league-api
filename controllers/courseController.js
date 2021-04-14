const Course = require("../models/course");
const crudController = require("../utils/crud");
const { getCourseInfo } = require("../utils/api/dgcoursereview/courses");

const getOne = async (req, res, next) => {
  getCourseInfo(req, res, next);
};
module.exports = { ...crudController(Course), getOne };
