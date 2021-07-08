const errorHandler = (err, req, res, next) => {
  if (err.status && err.message)
    return res.status(400).send({ error: err.message });

  next();
};

module.exports = errorHandler;
