const axios = require("axios");
const config = require("config");

const searchCourses = async (mode, query) => {
  return axios.get(
    `${config.dgcoursereviewURL}?key=${config.dgcoursereviewkey}&mode=${mode}&${query}&sig=${config.dgcoursereviewSig[mode]}`
  );
};

const getCourse = async (id) => {
  const mode = "holeinfo";

  return axios.get(
    `${config.dgcoursereviewURL}?key=${config.dgcoursereviewkey}&mode=${mode}&id=${id}&sig=${config.dgcoursereviewSig[mode]}`
  );
};

const getCoursesByIds = async (courseIds) => {
  try {
    const promises = courseIds.map(async (courseId) => {
      const course = await getCourse(courseId).then((course) => course.data);

      const courseInfo = course[0];
      const holes = course.filter((hole) => hole.hole_num);
      const { tee_1_clr, tee_2_clr, tee_3_clr, tee_4_clr } = courseInfo;
      const tees = [];

      if (tee_1_clr) tees.push(1);
      if (tee_2_clr) tees.push(2);
      if (tee_3_clr) tees.push(3);
      if (tee_4_clr) tees.push(4);
      const layouts = [];

      for (let i = 0; i < tees.length; i++) {
        const layout = holes.map((hole) => {
          return {
            length: hole[`tee_${tees[i]}_len`],
            par: hole[`tee_${tees[i]}_par`],
          };
        });
        layouts.push(layout);
      }
      return { ...courseInfo, layouts };
    });

    const courses = await Promise.all(promises);

    return courses;
  } catch (err) {
    return [];
  }
};

module.exports = {
  getCourse,
  searchCourses,
  getCoursesByIds,
};
