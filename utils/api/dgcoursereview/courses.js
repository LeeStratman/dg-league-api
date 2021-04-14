const axios = require("axios");
const config = require("config");
const {
  BadRequestError,
  ResourceExistsError,
  ServerError,
} = require("../../error");

const getCourseInfo = async (req, res, next) => {
  const { id } = req.params;
  const mode = "crseinfo";

  try {
    const response = await axios.get(
      `${config.dgcoursereviewURL}?key=${config.dgcoursereviewkey}&mode=${mode}&id=${id}&sig=${config.dgcoursereviewSig[mode]}`
    );

    if (response.status !== 200) {
      return next(new BadRequestError());
    }

    if (!response.data) {
      return next(new ResourceExistsError("Course"));
    }

    return res.status(200).send(response.data);
  } catch (err) {
    return next(new ServerError(err));
  }
};

module.exports = {
  getCourseInfo,
};
