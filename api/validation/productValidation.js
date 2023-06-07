const Joi = require("@hapi/joi");

// CREATE PRODUCT VALIDATION
const createValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    price: Joi.number().min(0).required(),
    stock: Joi.number().min(0).required(),
    description: Joi.string().min(1).required(),
    image: Joi.array().items(Joi.string().min(1)).required(),
  });

  return schema.validate(data);
};

// UPDATE PRODUCT VALIDATION
const updateValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1),
    price: Joi.number().min(0),
    stock: Joi.number().min(0),
    description: Joi.string().min(1),
    image: Joi.array().items(Joi.string().min(1)),
  });

  return schema.validate(data);
};

module.exports.updateValidation = updateValidation;
module.exports.createValidation = createValidation;
