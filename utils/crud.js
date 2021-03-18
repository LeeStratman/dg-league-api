const query = require("./query");

const getOne = (model) => async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await query.getOne(model, id);

    if (!result) {
      return res.status(404).json({
        error: `The ${model.modelName} with id '${id}' does not exist`,
      });
    }

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};

const getAll = (model) => async (req, res, next) => {
  try {
    const result = await query.getAll(model);

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};

const createOne = (model) => async (req, res, next) => {
  try {
    const result = await query.createOne(model, req.body);

    return res.status(201).json(result);
  } catch (err) {
    return next(err);
  }
};

const updateOne = (model) => async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await query.updateOne(model, id, req.body);

    if (!result)
      return res.status(404).json({
        error: `The ${model.modelName} with id '${id}' does not exist`,
      });

    res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};

const removeOne = (model) => async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await query.removeOne(model, id);

    if (result.deletedCount === 0)
      return res.status(404).json({
        error: `The ${model.modelName} with id '${id}' does not exist`,
      });

    return res.status(200).json(id);
  } catch (err) {
    return next(err);
  }
};

module.exports = (model) => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getAll: getAll(model),
  getOne: getOne(model),
  createOne: createOne(model),
});
