const Joi = require("joi");

const createSaleSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        menuItemId: Joi.number().required(),
        quantity: Joi.number().min(1).required(),
      })
    )
    .min(1)
    .required(),
  // Add other sale fields as needed
});

module.exports = {
  createSaleSchema,
};
