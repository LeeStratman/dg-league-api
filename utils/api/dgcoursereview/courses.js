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

module.exports = {
  getCourse,
  searchCourses,
};
