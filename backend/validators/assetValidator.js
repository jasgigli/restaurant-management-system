const Joi = require("joi");

const createAssetSchema = Joi.object({
  name: Joi.string().required(),
  cost: Joi.number().required(),
  // Add other fields as needed
});

const updateAssetSchema = Joi.object({
  name: Joi.string(),
  cost: Joi.number(),
  // Add other fields as needed
});

module.exports = {
  createAssetSchema,
  updateAssetSchema,
};
