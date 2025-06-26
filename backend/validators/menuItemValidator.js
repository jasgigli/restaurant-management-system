const Joi = require("joi");

const createMenuItemSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  // Add other fields as needed
});

const updateMenuItemSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number(),
  // Add other fields as needed
});

module.exports = {
  createMenuItemSchema,
  updateMenuItemSchema,
};
