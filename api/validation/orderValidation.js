const Joi = require("@hapi/joi");

// CREATE ORDER VALIDATION
const orderIdValidation = (data) => {
  const schema = Joi.object({
    productId: Joi.string().min(1).required(),
  });

  return schema.validate(data);
};

module.exports.orderIdValidation = orderIdValidation;
