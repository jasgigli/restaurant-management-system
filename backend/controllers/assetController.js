import { StaffAssignedItem } from "../models/index.js";
import assetService from "../services/assetService.js";

// Restaurant Assets
export async function createAsset(req, res, next) {
  try {
    const asset = await assetService.createAsset(req.body);
    res.status(201).json(asset);
  } catch (error) {
    next(error);
  }
}

export async function getAssets(req, res, next) {
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
}

export async function updateAsset(req, res, next) {
  try {
    const asset = await assetService.updateAsset(req.params.id, req.body);
    res.json(asset);
  } catch (error) {
    next(error);
  }
}

export async function deleteAsset(req, res, next) {
  try {
    await assetService.deleteAsset(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

// Staff Assigned Items
export async function createAssignedItem(req, res, next) {
  try {
    const item = await assetService.createAssignedItem(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
}

export async function getAssignedItems(req, res, next) {
  try {
    const items = await assetService.getAssignedItems();
    res.json(items);
  } catch (error) {
    next(error);
  }
}

export async function updateAssignedItem(req, res, next) {
  try {
    const item = await assetService.updateAssignedItem(req.params.id, req.body);
    res.json(item);
  } catch (error) {
    next(error);
  }
}

export async function deleteAssignedItem(req, res, next) {
  try {
    await assetService.deleteAssignedItem(req.params.id);
    res.json({ message: "Assigned item deleted" });
  } catch (error) {
    next(error);
  }
}
