const {
  getCourse,
  searchCourses,
} = require("../utils/api/dgcoursereview/courses");
const {
  BadRequestError,
  ResourceExistsError,
  ServerError,
} = require("../utils/error");

const getAll = async (req, res, next) => {
  let mode;
  let query;

  if (req.query.name) {
    query = `name=${req.query.name}`;
    mode = "findname";
  }

  try {
    const courses = await searchCourses(mode, query);

    if (courses.status !== 200) {
      return next(new BadRequestError());
    }

    if (!courses.data) {
      return next(new ResourceExistsError("Course"));
    }

    return res.status(200).send(courses.data);
  } catch (err) {
    return next(new ServerError(err));
  }
};

const getOne = async (req, res, next) => {
  const { id } = req.params;

  try {
    const course = await getCourse(id);

    if (course.status !== 200) {
      return next(new BadRequestError());
    }

    if (!course.data) {
      return next(new ResourceExistsError("Course"));
    }

    return res.status(200).send(course.data);
  } catch (err) {
    return next(new ServerError(err));
  }
};

module.exports = { getAll, getOne };
