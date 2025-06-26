const storeItemService = require("../services/storeItemService");
const AppError = require("../utils/AppError");

exports.getStoreItems = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await storeItemService.getStoreItems({
      page: Number(page),
      limit: Number(limit),
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.createStoreItem = async (req, res, next) => {
  try {
    const storeItem = await storeItemService.createStoreItem(req.body);
    res.status(201).json(storeItem);
  } catch (error) {
    next(error);
  }
};

exports.updateStoreItem = async (req, res, next) => {
  try {
    const storeItem = await storeItemService.updateStoreItem(
      req.params.id,
      req.body
    );
    res.json(storeItem);
  } catch (error) {
    next(error);
  }
};

exports.deleteStoreItem = async (req, res, next) => {
  try {
    await storeItemService.deleteStoreItem(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
