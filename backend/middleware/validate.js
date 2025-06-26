const Joi = require("joi");
const AppError = require("../utils/AppError");

const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });
    if (error) {
      return next(
        new AppError(error.details.map((d) => d.message).join(", "), 400)
      );
    }
    next();
  };
};

module.exports = validate;
