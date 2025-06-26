const { RestaurantAsset, StaffAssignedItem } = require("../models");
const assetService = require("../services/assetService");
const AppError = require("../utils/AppError");

// Restaurant Assets
exports.createAsset = async (req, res, next) => {
  try {
    const asset = await assetService.createAsset(req.body);
    res.status(201).json(asset);
  } catch (error) {
    next(error);
  }
};

exports.getAssets = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await assetService.getAssets({
      page: Number(page),
      limit: Number(limit),
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.updateAsset = async (req, res, next) => {
  try {
    const asset = await assetService.updateAsset(req.params.id, req.body);
    res.json(asset);
  } catch (error) {
    next(error);
  }
};

exports.deleteAsset = async (req, res, next) => {
  try {
    await assetService.deleteAsset(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Staff Assigned Items
exports.createAssignedItem = async (req, res) => {
  try {
    const item = await StaffAssignedItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAssignedItems = async (req, res) => {
  try {
    const items = await StaffAssignedItem.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAssignedItem = async (req, res) => {
  try {
    const item = await StaffAssignedItem.findByPk(req.params.id);
    if (!item)
      return res.status(404).json({ message: "Assigned item not found" });
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAssignedItem = async (req, res) => {
  try {
    const item = await StaffAssignedItem.findByPk(req.params.id);
    if (!item)
      return res.status(404).json({ message: "Assigned item not found" });
    await item.destroy();
    res.json({ message: "Assigned item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
