const Course = require("../models/course");
const crudController = require("../utils/crud");

module.exports = crudController(Course);
